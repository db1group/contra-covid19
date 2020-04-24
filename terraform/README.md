# Terraform

## Preparando o ambiente

`terraform init`

`terraform workspace new qa`

`terraform workspace new prod`

## Executando atualizações

### Ambiente de QA

`terraform workspace select qa`
`terraform apply -state=state-qa -var-file=stage-qa/terraform.tfvars`

### Ambiente de Produção

`terraform workspace select prod`
`terraform apply -state=state-prod -var-file=stage-prod/terraform.tfvars`