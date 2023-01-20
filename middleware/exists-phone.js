export default function ({ store, redirect }) {
  if (store.state.auth.loggedIn && !store.state.auth.user.phone) {
    return redirect('/profile/edit')
  }
}
