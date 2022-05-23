export function removeButtonFocus(key, buttonRef) {
  buttonRef
    .filter((ref) => ref !== buttonRef[key])
    .map((button) => {
      button.current.style.backgroundColor = "transparent";
      button.current.style.border = "1px solid white";
      button.current.style.color = "#ffffff";
    });
}

export function buttonFocus(key, buttonRef) {
  buttonRef[key].current.style.backgroundColor = "#2AF598";
  buttonRef[key].current.style.border = "#2AF598";
  buttonRef[key].current.style.color = "#000000";
}
