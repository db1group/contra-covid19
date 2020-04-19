terraform {
  backend "s3" {
    bucket               = "notificasaude"
    workspace_key_prefix = "terraform"
    key                  = "terraform.tfstate"
    region               = "us-east-1"
    encrypt              = true
  }
}

data "aws_region" "current" {
}

data "aws_caller_identity" "current" {
}

provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

variable "project" {
  description = "Project"
}

variable "environment" {
  description = "Environment"
}

variable "is_production" {
  description = "Define if is production environment"
}

############# Network #############

variable "vpc_cidr_block" {
  description = "VPC cidr_block"
}

variable "vpc_subnet_a_cidr_block" {
  description = "VPC Subnet A cidr_block"
}

variable "vpc_subnet_b_cidr_block" {
  description = "VPC Subnet B cidr_block"
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr_block
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.project}-${var.environment}"
  }
}

resource "aws_subnet" "subnet_a" {
  vpc_id     = aws_vpc.main.id
  cidr_block = var.vpc_subnet_a_cidr_block

  tags = {
    Name = "${var.project}-${var.environment}"
  }
}

resource "aws_subnet" "subnet_b" {
  vpc_id     = aws_vpc.main.id
  cidr_block = var.vpc_subnet_b_cidr_block

  tags = {
    Name = "${var.project}-${var.environment}"
  }
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project}-${var.environment}"
  }
}

resource "aws_route_table" "route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gateway.id
  }

  tags = {
    Name = "${var.project}-${var.environment}"
  }
}

resource "aws_security_group" "public_sg" {
  name   = "${var.project}-${var.environment}"
  vpc_id = aws_vpc.main.id

  ingress {
    description = "TLS from VPC"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main.cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

############# Database #############

variable "pg_database_username" {
  description = "Postgres Database Username"
}

variable "pg_database_password" {
  description = "Postgres Database Password"
}

resource "aws_db_subnet_group" "db_subnet_group" {
  name       = "${var.project}-${var.environment}"
  subnet_ids = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
}

resource "aws_db_instance" "database" {
  allocated_storage      = 20
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "11.5"
  instance_class         = "db.t2.micro"
  name                   = "${var.project}${var.environment}"
  identifier             = "${var.project}${var.environment}"
  username               = var.pg_database_username
  password               = var.pg_database_password
  vpc_security_group_ids = [aws_security_group.public_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.db_subnet_group.id
  publicly_accessible    = true
}

############# IAM #############

data "aws_iam_policy_document" "ecs_service_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_service_role" {
  name               = "ecs-service-${var.project}-${var.environment}"
  path               = "/"
  assume_role_policy = data.aws_iam_policy_document.ecs_service_policy.json
}

resource "aws_iam_role_policy_attachment" "ecs_service_role_attachment" {
  role       = aws_iam_role.ecs_service_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceRole"
}

resource "aws_iam_role_policy" "ecs_service_role_policy" {
  name = "ecs-service-role-policy"
  role = aws_iam_role.ecs_service_role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "ec2:Describe*"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF

}

resource "aws_iam_role" "ecs_instance_role" {
  name               = "ecs-instance-${var.project}-${var.environment}"
  path               = "/"
  assume_role_policy = data.aws_iam_policy_document.ecs_instance_policy.json
}

data "aws_iam_policy_document" "ecs_instance_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_instance_profile" "ecs_instance_profile" {
  name = "${var.project}-${var.environment}"
  path = "/"
  role = aws_iam_role.ecs_instance_role.id
  provisioner "local-exec" {
    command = "sleep 10"
  }
}

resource "aws_iam_role_policy_attachment" "ecs_instance_role_attachment" {
  role       = aws_iam_role.ecs_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

############ ALB ############

resource "aws_alb" "ecs_load_balancer" {
  name            = "${var.project}-${var.environment}"
  security_groups = [aws_security_group.public_sg.id]
  subnets         = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
}

#TODO
resource "aws_alb_listener" "alb_listener_http" {
  load_balancer_arn = aws_alb.ecs_load_balancer.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_alb_target_group.ecs_target_group_keycloak.arn
    type             = "forward"
  }
}

resource "aws_alb_listener" "alb_listener_https" {
  load_balancer_arn = aws_alb.ecs_load_balancer.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = "arn:aws:acm:us-east-1:032230612239:certificate/01513521-3ae4-41f2-9840-b61db610a003"

  default_action {
    target_group_arn = aws_alb_target_group.ecs_target_group_keycloak.arn
    type             = "forward"
  }
}

############ Scaling ############

variable "ecs_ami" {
  description = "AMI for ECS"
}

variable "ecs_instance_type" {
  description = "Instance Type for ECS"
}

variable "ecs_max_instance_size" {
  description = "ECS Max Instance Size"
}

variable "ecs_min_instance_size" {
  description = "ECS Min Instance Size"
}

variable "ecs_desired_capacity" {
  description = "ECS Desired Capacity"
}

resource "aws_launch_configuration" "ecs_launch_configuration" {
  name                 = "${var.project}-${var.environment}"
  image_id             = var.ecs_ami
  instance_type        = var.ecs_instance_type
  iam_instance_profile = aws_iam_instance_profile.ecs_instance_profile.id

  root_block_device {
    volume_type           = "standard"
    volume_size           = 100
    delete_on_termination = true
  }

  lifecycle {
    create_before_destroy = false
  }

  security_groups             = [aws_security_group.public_sg.id]
  associate_public_ip_address = "true"
  key_name                    = var.project
  user_data                   = <<EOF
                                  #!/bin/bash
                                  echo ECS_CLUSTER=${var.project}-${var.environment} >> /etc/ecs/ecs.config
                                  
EOF

}

resource "aws_autoscaling_group" "ecs_autoscaling_group" {
  name                 = "${var.project}-${var.environment}"
  max_size             = var.ecs_max_instance_size
  min_size             = var.ecs_min_instance_size
  desired_capacity     = var.ecs_desired_capacity
  vpc_zone_identifier  = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
  launch_configuration = aws_launch_configuration.ecs_launch_configuration.name
  health_check_type    = "EC2"
}

############ ECR ############

resource "aws_ecr_repository" "keycloak" {
  name                 = "${var.project}/keycloak"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "backend" {
  name                 = "${var.project}/backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_repository" "frontend" {
  name                 = "${var.project}/frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

############ ECS ############

resource "aws_ecs_cluster" "ecs_cluster" {
  name = "${var.project}-${var.environment}"
}

############# DNS #############

variable "hosted_zone" {
  description = "Hosted Zone"
}

resource "aws_route53_zone" "hosted_zone" {
  name = var.hosted_zone
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.hosted_zone.zone_id
  name    = var.is_production == true ? "www.${aws_route53_zone.hosted_zone.name}" : "${var.environment}-www.${aws_route53_zone.hosted_zone.name}"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_alb.ecs_load_balancer.dns_name]
}

resource "aws_route53_record" "auth" {
  zone_id = aws_route53_zone.hosted_zone.zone_id
  name    = var.is_production == true ? "auth.${aws_route53_zone.hosted_zone.name}" : "${var.environment}-auth.${aws_route53_zone.hosted_zone.name}"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_alb.ecs_load_balancer.dns_name]
}

resource "aws_route53_record" "api" {
  zone_id = aws_route53_zone.hosted_zone.zone_id
  name    = var.is_production == true ? "api.${aws_route53_zone.hosted_zone.name}" : "${var.environment}-api.${aws_route53_zone.hosted_zone.name}"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_alb.ecs_load_balancer.dns_name]
}

resource "aws_route53_record" "database" {
  zone_id = aws_route53_zone.hosted_zone.zone_id
  name    = var.is_production == true ? "database.${aws_route53_zone.hosted_zone.name}" : "${var.environment}-database.${aws_route53_zone.hosted_zone.name}"
  type    = "CNAME"
  ttl     = "300"
  records = [aws_db_instance.database.address]
}

############# Keycloak #############

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

resource "aws_alb_listener_rule" "aws_alb_listener_rule_http" {
  listener_arn = aws_alb_listener.alb_listener_http.arn
  priority     = 1

  action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }

  condition {
    field  = "host-header"
    values = [var.is_production == true ? "auth.${aws_route53_zone.hosted_zone.name}" : "${var.environment}-auth.${aws_route53_zone.hosted_zone.name}"]
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
    values = [var.is_production == true ? "auth.${aws_route53_zone.hosted_zone.name}" : "${var.environment}-auth.${aws_route53_zone.hosted_zone.name}"]
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
    values = [var.is_production == true ? "auth.${aws_route53_zone.hosted_zone.name}" : "${var.environment}-auth.${aws_route53_zone.hosted_zone.name}"]
  }
}

resource "aws_ecs_task_definition" "keycloak" {
  family                = "${var.project}-${var.environment}-keycloak"
  container_definitions = <<DEFINITION
[
  {
    "name": "${var.project}-${var.environment}-keycloak",
    "image": "${data.aws_caller_identity.current.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/${var.project}/keycloak:${var.environment}",
    "essential": true,
    "privileged": true,
    "portMappings": [
      {
        "containerPort": 8080,
        "hostPort": 8080,
        "protocol": "tcp"
      },
      {
        "containerPort": 7600,
        "hostPort": 7600,
        "protocol": "tcp"
      },
      {
        "containerPort": 8888,
        "hostPort": 8888,
        "protocol": "tcp"
      },
      {
        "containerPort": 8009,
        "hostPort": 8009,
        "protocol": "tcp"
      },
      {
        "containerPort": 9990,
        "hostPort": 9990,
        "protocol": "tcp"
      }
    ],
    "memory": 512,
    "cpu": 10,
    "environment" : [
      { 
        "name" : "PG_DATABASE_URL", 
        "value" : "jdbc:postgresql://${aws_db_instance.database.address}:5432/${var.project}-keycloak" 
      },
      { 
        "name" : "PG_DATABASE_USERNAME", 
        "value" : "${aws_db_instance.database.username}" 
      },
      { 
        "name" : "PG_DATABASE_PASSWORD", 
        "value" : "${aws_db_instance.database.password}" 
      },
      { 
        "name" : "JAVA_OPTS", 
        "value" : "-Xmx512m -Xmx512m" 
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

############# Backend #############

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
    values = [var.is_production == true ? "api.${aws_route53_zone.hosted_zone.name}" : "${var.environment}-api.${aws_route53_zone.hosted_zone.name}"]
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
    values = [var.is_production == true ? "api.${aws_route53_zone.hosted_zone.name}" : "${var.environment}-api.${aws_route53_zone.hosted_zone.name}"]
  }
}

resource "aws_ecs_task_definition" "backend" {
  family                = "${var.project}-${var.environment}-backend"
  network_mode          = "bridge"
  container_definitions = <<DEFINITION
[
  {
    "name": "${var.project}-${var.environment}-backend",
    "image": "${data.aws_caller_identity.current.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/${var.project}/backend:${var.environment}",
    "essential": true,
    "privileged": true,
    "portMappings": [
      {
        "containerPort": 8080,
        "hostPort": 0
      }
    ],
    "memory": 512,
    "cpu": 10,
    "environment" : [
      { 
        "name" : "PG_DATABASE_URL", 
        "value" : "jdbc:postgresql://${aws_db_instance.database.address}:5432/${var.project}-backend" 
      },
      { 
        "name" : "PG_DATABASE_USERNAME", 
        "value" : "${aws_db_instance.database.username}" 
      },
      { 
        "name" : "PG_DATABASE_PASSWORD",
        "value" : "${aws_db_instance.database.password}"
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
    container_port   = 8080
    container_name   = "${var.project}-${var.environment}-backend"
  }
}

############# Frontend #############

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

resource "aws_alb_listener_rule" "aws_alb_listener_rule_http_frontend" {
  listener_arn = aws_alb_listener.alb_listener_http.arn
  priority     = 60

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.ecs_target_group_frontend.arn
  }

  condition {
    field  = "host-header"
    values = [var.is_production == true ? "www.${aws_route53_zone.hosted_zone.name}" : "${var.environment}-www.${aws_route53_zone.hosted_zone.name}"]
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
    values = [var.is_production == true ? "www.${aws_route53_zone.hosted_zone.name}" : "${var.environment}-www.${aws_route53_zone.hosted_zone.name}"]
  }
}

resource "aws_ecs_task_definition" "frontend" {
  family                = "${var.project}-${var.environment}-frontend"
  network_mode          = "bridge"
  container_definitions = <<DEFINITION
[
  {
    "name": "${var.project}-${var.environment}-frontend",
    "image": "${data.aws_caller_identity.current.account_id}.dkr.ecr.${data.aws_region.current.name}.amazonaws.com/${var.project}/frontend:${var.environment}",
    "essential": true,
    "privileged": true,
    "portMappings": [
      {
        "containerPort": 8080,
        "hostPort": 0
      }
    ],
    "memory": 512,
    "cpu": 10,
    "environment" : [
      { 
        "name" : "BACKEND_URL",
        "value" : "${var.is_production == true ? "api.${aws_route53_zone.hosted_zone.name}" : "${var.environment}-api.${aws_route53_zone.hosted_zone.name}"}"
      },
      { 
        "name" : "AUTH_URL",
        "value" : "${var.is_production == true ? "auth.${aws_route53_zone.hosted_zone.name}" : "${var.environment}-auth.${aws_route53_zone.hosted_zone.name}"}"
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
    container_port   = 8080
    container_name   = "${var.project}-${var.environment}-frontend"
  }
}

