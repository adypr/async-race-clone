export default (element: HTMLElement) => {
  const footerContent = `<footer class="footer">
                                <div class="container">
                                    <ul class="footer__contacts">
                                        <li class="year">
                                            <p class="task">
                                                <a href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/async-race.md">Task Async Race</a> 2022
                                            </p>
                                        </li>
                                        <li>
                                        <a class="footer__link" href="https://github.com/adypr">
                                            <svg class="footer__icon" width="50" height="35">
                                            <use xlink:href="./assets/icons/footer.svg#github"></use>
                                            </svg>
                                        </a>
                                        </li>
                                        <li>
                                        <a href="https://rs.school/js/" > 
                                            <svg class="footer__icon" width="70" height="35">
                                            <use xlink:href="./assets/icons/footer.svg#rs"></use>
                                            </svg>
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </footer>`;
  element.insertAdjacentHTML('beforeend', footerContent);
};
