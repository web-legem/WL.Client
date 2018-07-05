<script>
export default {
  fetch ({ redirect, app }) {
    redirect(301, app.localePath({name: 'admin-doc-types'}))
  }
}
</script>
