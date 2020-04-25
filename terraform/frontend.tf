resource "aws_alb_target_group" "ecs_target_group_frontend" {
  name       = "${var.project}-${var.environment}-frontend"
  port       = "8282"
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

resource "aws_alb_listener_rule" "aws_alb_listener_rule_http_frontend_app" {
  listener_arn = aws_alb_listener.alb_listener_http.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecs_target_group_frontend.arn
  }

  condition {
    field  = "host-header"
    values = [var.is_production == true ? "app.${var.hosted_zone}" : "${var.environment}-app.${var.hosted_zone}"]
  }
}

resource "aws_alb_listener_rule" "aws_alb_listener_rule_https_frontend_app" {
  listener_arn = aws_alb_listener.alb_listener_https.arn
  priority     = 120

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecs_target_group_frontend.arn
  }

  condition {
    field  = "host-header"
    values = [var.is_production == true ? "app.${var.hosted_zone}" : "${var.environment}-app.${var.hosted_zone}"]
  }
}

resource "aws_alb_listener_rule" "aws_alb_listener_rule_http_frontend" {
  listener_arn = aws_alb_listener.alb_listener_http.arn
  priority     = 60

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecs_target_group_frontend.arn
  }

  condition {
    field  = "host-header"
    values = [var.is_production == true ? "www.${var.hosted_zone}" : "${var.environment}-www.${var.hosted_zone}"]
  }
}

resource "aws_alb_listener_rule" "aws_alb_listener_rule_https_frontend" {
  listener_arn = aws_alb_listener.alb_listener_https.arn
  priority     = 80

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecs_target_group_frontend.arn
  }

  condition {
    field  = "host-header"
    values = [var.is_production == true ? "www.${var.hosted_zone}" : "${var.environment}-www.${var.hosted_zone}"]
  }
}

resource "aws_ecs_task_definition" "frontend" {
  family                = "${var.project}-${var.environment}-frontend"
  network_mode          = "bridge"
  container_definitions = <<DEFINITION
[
  {
    "name": "${var.project}-${var.environment}-frontend",
    "image": "${data.aws_caller_identity.current.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/${var.project}/frontend:${var.is_production == true ? "latest" : var.environment}",
    "essential": true,
    "privileged": true,
    "portMappings": [
      {
        "containerPort": 8282,
        "hostPort": 0
      }
    ],
    "memory": 256,
    "cpu": 100,
    "environment" : [
      { 
        "name" : "NODE_ENV",
        "value" : "${var.environment}"
      },
      { 
        "name" : "VUE_APP_BACKEND_URL",
        "value" : "${var.is_production == true ? "https://api.${var.hosted_zone}/api" : "https://${var.environment}-api.${var.hosted_zone}/api"}"
      },
      { 
        "name" : "VUE_APP_KEYCLOAK_URL",
        "value" : "${var.is_production == true ? "https://auth.${var.hosted_zone}/auth" : "https://${var.environment}-auth.${var.hosted_zone}/auth"}"
      },
      { 
        "name" : "VUE_APP_KEYCLOAK_REALM",
        "value" : "${var.project}"
      },
      { 
        "name" : "VUE_APP_KEYCLOAK_CLIENT_ID",
        "value" : "${var.project}"
      },
      { 
        "name" : "VUE_APP_MUNICIPIO_ID",
        "value" : "fcf83c0a-8de6-43a5-9845-907f597f56ce"
      },
      { 
        "name" : "PORT",
        "value" : "8282"
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

resource "aws_ecs_service" "ecs_service_frontend" {
  name     = "${var.project}-${var.environment}-frontend"
  iam_role = aws_iam_role.ecs_service_role.name
  cluster  = aws_ecs_cluster.ecs_cluster.id
  task_definition = "${aws_ecs_task_definition.frontend.family}:${max(
    aws_ecs_task_definition.frontend.revision,
    aws_ecs_task_definition.frontend.revision,
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
    target_group_arn = aws_alb_target_group.ecs_target_group_frontend.arn
    container_port   = 8282
    container_name   = "${var.project}-${var.environment}-frontend"
  }
}

