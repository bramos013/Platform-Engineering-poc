resource "kubernetes_namespace" "platform_poc" {
  metadata {
    name = "platform-poc"
  }
}

resource "helm_release" "backend" {

  name      = "backend"
  namespace = kubernetes_namespace.platform_poc.metadata[0].name

  chart = "../helm-charts/backend"
}

resource "helm_release" "frontend" {

  name      = "frontend"
  namespace = kubernetes_namespace.platform_poc.metadata[0].name

  chart = "../helm-charts/frontend"
}

resource "kubernetes_secret" "postgres" {

  metadata {
    name      = "postgres-secret"
    namespace = kubernetes_namespace.platform_poc.metadata[0].name
  }

  data = {
    POSTGRES_PASSWORD = "admin123"
  }

  type = "Opaque"
}