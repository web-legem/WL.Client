<script>
export default {
  fetch({redirect, app}) {
    redirect(301, app.localePath({name: 'persons-users'}))
  }
}
</script>
