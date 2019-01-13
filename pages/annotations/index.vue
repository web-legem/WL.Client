<script>
export default {
  fetch ({ redirect, app }) {
    redirect(301, app.localePath({name: 'annotations-source-document'}))
  }
}
</script>

<style>
</style>