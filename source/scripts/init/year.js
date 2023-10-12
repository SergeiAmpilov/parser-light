

export const initYear = () => {
  document.querySelectorAll('.footer__year').forEach((el) => {
    el.innerHTML = new Date().getFullYear();
  });
  
}