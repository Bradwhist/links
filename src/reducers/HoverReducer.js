
const HoverReducer = (state = {fixed: false}, action) => {
  switch (action.type) {
    case 'HIDE_FIXED':
      return state;
    case 'SHOW_FIXED':
      let newBool = state.fixed;
      newBool = true;
      return {fixed: newBool};
    default:
      return state
  }
}

export default HoverReducer;
