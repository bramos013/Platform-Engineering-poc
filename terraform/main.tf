resource "kubernetes_namespace" "platform_poc" {
  metadata {
    name = "platform-poc"
  }
}