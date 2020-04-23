resource "aws_alb_target_group" "ecs_target_group_keycloak" {
  name       = "${var.project}-${var.environment}-keycloak"
  port       = "8080"
  protocol   = "HTTP"
  vpc_id     = aws_vpc.main.id
  slow_start = 0

  health_check {
    healthy_threshold   = "5"
    unhealthy_threshold = "5"
    interval            = "60"
    matcher             = "200"
    path                = "/auth/realms/master/health/check"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = "30"
  }
}

resource "aws_alb_listener_rule" "aws_alb_listener_rule_http_keycloak" {
  listener_arn = aws_alb_listener.alb_listener_http.arn
  priority     = 10

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecs_target_group_keycloak.arn
  }

  condition {
    field  = "host-header"
    values = [var.is_production == true ? "auth.${var.hosted_zone}" : "${var.environment}-auth.${var.hosted_zone}"]
  }
}

resource "aws_alb_listener_rule" "aws_alb_listener_rule_https_keycloak" {
  listener_arn = aws_alb_listener.alb_listener_https.arn
  priority     = 30

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecs_target_group_keycloak.arn
  }

  condition {
    field  = "host-header"
    values = [var.is_production == true ? "auth.${var.hosted_zone}" : "${var.environment}-auth.${var.hosted_zone}"]
  }
}

resource "aws_ecs_task_definition" "keycloak" {
  family                = "${var.project}-${var.environment}-keycloak"
  network_mode          = "bridge"
  container_definitions = <<DEFINITION
[
  {
    "name": "${var.project}-${var.environment}-keycloak",
    "image": "${data.aws_caller_identity.current.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/${var.project}/keycloak:${var.is_production == true ? "latest" : var.environment}",
    "essential": true,
    "privileged": true,
    "portMappings": [
      {
        "containerPort": 8080,
        "hostPort": 0
      }
    ],
    "memory": 1024,
    "cpu": 300,
    "environment" : [
      { 
        "name" : "DATABASE_URL", 
        "value" : "${aws_db_instance.database.address}" 
      },
      { 
        "name" : "DATABASE_USERNAME", 
        "value" : "${aws_db_instance.database.username}" 
      },
      { 
        "name" : "DATABASE_PASSWORD", 
        "value" : "${aws_db_instance.database.password}" 
      },
      { 
        "name" : "JAVA_OPTS", 
        "value" : "-Xmx1024m -Xmx1024m" 
      },
      {
        "name" : "KEYCLOAK_USER",
        "value" : "admin"
      },
      {
        "name" : "KEYCLOAK_PASSWORD",
        "value" : "admin"
      }
    ],
    "requiresAttributes": [
        {
        "value": null,
        "name": "com.amazonaws.ecs.capability.ecr-auth",
        "targetId": null,
        "targetType": null
        },
        {
        "value": null,
        "name": "com.amazonaws.ecs.capability.task-iam-role",
        "targetId": null,
        "targetType": null
        },
        {
        "value": null,
        "name": "com.amazonaws.ecs.capability.docker-remote-api.1.19",
        "targetId": null,
        "targetType": null
        }
    ]
  }
]
DEFINITION

}

resource "aws_ecs_service" "ecs_service_keycloak" {
  name     = "${var.project}-${var.environment}-keycloak"
  iam_role = aws_iam_role.ecs_service_role.name
  cluster  = aws_ecs_cluster.ecs_cluster.id
  task_definition = "${aws_ecs_task_definition.keycloak.family}:${max(
    aws_ecs_task_definition.keycloak.revision,
    aws_ecs_task_definition.keycloak.revision,
  )}"
  scheduling_strategy               = "REPLICA"
  health_check_grace_period_seconds = 30
  desired_count                     = 1
  launch_type                       = "EC2"

  ordered_placement_strategy {
    type  = "spread"
    field = "host"
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.ecs_target_group_keycloak.arn
    container_port   = 8080
    container_name   = "${var.project}-${var.environment}-keycloak"
  }
}