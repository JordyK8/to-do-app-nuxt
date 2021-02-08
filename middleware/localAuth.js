export default function ({route, store, redirect}) {
  if (route.path === '/' && !store.state.user.id) {
    return redirect('/login');
  }
}
