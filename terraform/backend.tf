resource "aws_alb_target_group" "ecs_target_group_backend" {
  name       = "${var.project}-${var.environment}-backend"
  port       = "8181"
  protocol   = "HTTP"
  vpc_id     = aws_vpc.main.id
  slow_start = 0

  health_check {
    healthy_threshold   = "5"
    unhealthy_threshold = "5"
    interval            = "60"
    matcher             = "200"
    path                = "/actuator/health"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = "30"
  }
}

resource "aws_alb_listener_rule" "aws_alb_listener_rule_http_backend" {
  listener_arn = aws_alb_listener.alb_listener_http.arn
  priority     = 20

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecs_target_group_backend.arn
  }

  condition {
    field  = "host-header"
    values = [var.is_production == true ? "api.${var.hosted_zone}" : "${var.environment}-api.${var.hosted_zone}"]
  }
}

resource "aws_alb_listener_rule" "aws_alb_listener_rule_https_backend" {
  listener_arn = aws_alb_listener.alb_listener_https.arn
  priority     = 40

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecs_target_group_backend.arn
  }

  condition {
    field  = "host-header"
    values = [var.is_production == true ? "api.${var.hosted_zone}" : "${var.environment}-api.${var.hosted_zone}"]
  }
}

resource "random_uuid" "secret" { }

resource "aws_ecs_task_definition" "backend" {
  family                = "${var.project}-${var.environment}-backend"
  network_mode          = "bridge"
  container_definitions = <<DEFINITION
[
  {
    "name": "${var.project}-${var.environment}-backend",
    "image": "${data.aws_caller_identity.current.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/${var.project}/backend:${var.is_production == true ? "latest" : var.environment}",
    "essential": true,
    "privileged": true,
    "portMappings": [
      {
        "containerPort": 8181,
        "hostPort": 0
      }
    ],
    "memory": 2024,
    "cpu": 100,
    "environment" : [
      {
        "name" : "NODE_ENV", 
        "value" : "${var.environment}"
      },
      {
        "name" : "DATABASE_URL", 
        "value" : "${aws_db_instance.database.address}"
      },
      {
        "name" : "DATABASE_NAME", 
        "value" : "${aws_db_instance.database.name}"
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
        "name" : "PORT",
        "value" : "8181"
      },
      {
        "name" : "KEYCLOAK_URL",
        "value" : "${var.is_production == true ? "https://auth.${var.hosted_zone}/auth" : "https://${var.environment}-auth.${var.hosted_zone}/auth"}"
      },
      {
        "name" : "SECRET_SESSION",
        "value" : "${random_uuid.secret.result}-ns"
      },
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

resource "aws_ecs_service" "ecs_service_backend" {
  name     = "${var.project}-${var.environment}-backend"
  iam_role = aws_iam_role.ecs_service_role.name
  cluster  = aws_ecs_cluster.ecs_cluster.id
  task_definition = "${aws_ecs_task_definition.backend.family}:${max(
    aws_ecs_task_definition.backend.revision,
    aws_ecs_task_definition.backend.revision,
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
    target_group_arn = aws_alb_target_group.ecs_target_group_backend.arn
    container_port   = 8181
    container_name   = "${var.project}-${var.environment}-backend"
  }
}