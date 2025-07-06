const DESKTOP_WIDTH = 1440;
const SCROLL_THRESHOLD = 200;

const menuToggle = document.querySelector('.main-header__toggle');

const submenu = document.querySelector('.main-header__submenu');
const submenuInfo = submenu.querySelector('.submenu__info');
const submenuList = submenu.querySelector('.submenu__list');

const catalog = submenu.querySelector('.categories__nested--catalog');
const catalogToggle = submenu.querySelector('.categories__link--catalog');

const mainHeaderWrapper = document.querySelector('.main-header__wrapper');
const langForm = mainHeaderWrapper.querySelector('.lang');
const mainNavLang = document.createElement('li');
mainNavLang.classList.add('main-nav__item');

const mainHeaderContacts = mainHeaderWrapper.querySelector('.main-header__contacts');
const mainNavList = document.querySelector('.main-nav__list');
const contacts = document.querySelector('.contacts');
const mainNavContacts = document.createElement('li');
mainNavContacts.classList.add('main-nav__item');

const categories = submenu.querySelector('.categories');

const onWindowScroll = () => {
  if (window.pageYOffset > SCROLL_THRESHOLD) {
    mainHeaderWrapper.classList.add('main-header__wrapper--hidden');
    submenu.classList.add('main-header__submenu--hidden');
    mainNavList.style.alignItems = 'center';
  } else {
    mainHeaderWrapper.classList.remove('main-header__wrapper--hidden');
    submenu.classList.remove('main-header__submenu--hidden');
    mainNavList.style.alignItems = 'start';
  }
};

const onMenuToggleClick = (evt) => {
  evt.preventDefault();
  if (window.innerWidth >= DESKTOP_WIDTH) {
    catalog.classList.toggle('categories__nested--show');
  } else {
    catalog.classList.remove('categories__nested--show');
    submenu.classList.toggle('main-header__submenu--show');
  }
};
menuToggle.addEventListener('click', onMenuToggleClick);

const onCategoriesClick = (evt) => {
  evt.preventDefault();
  const item = evt.target.closest('.categories__item');
  const nested = item.querySelector('.categories__nested');
  nested.classList.add('categories__nested--show');

  submenuInfo.classList.add('visually-hidden');
  submenuList.classList.add('visually-hidden');

  const onBackwardBtnClick = (e) => {
    e.stopPropagation();
    e.target.removeEventListener('click', onBackwardBtnClick);
    nested.classList.remove('categories__nested--show');

    const nestedList = categories.querySelectorAll('.categories__nested--show');
    if (!nestedList.length) {
      submenuInfo.classList.remove('visually-hidden');
      submenuList.classList.remove('visually-hidden');
    }
  };

  const backwardBtn = item.querySelector('.categories__btn');
  backwardBtn.addEventListener('click', onBackwardBtnClick);
};

const onCatalogOut = () => {
  catalog.classList.remove('categories__nested--show');
};

const getDesktopMenu = () => {
  mainHeaderWrapper.classList.add('submenu');
  mainHeaderWrapper.append(submenuList);

  contacts.classList.remove('submenu__contacts-list');
  mainNavContacts.append(contacts);
  mainNavList.append(mainNavContacts);

  langForm.classList.remove('main-header__lang');
  langForm.classList.add('main-nav__lang');
  mainNavLang.append(langForm);
  mainNavList.append(mainNavLang);

  submenuInfo.classList.remove('visually-hidden');
  submenuList.classList.remove('visually-hidden');

  catalogToggle.classList.add('visually-hidden');
  catalog.addEventListener('mouseout', onCatalogOut);
  categories.removeEventListener('click', onCategoriesClick);

  window.addEventListener('scroll', onWindowScroll);
};

const getMobileMenu = () => {
  mainHeaderWrapper.classList.remove('submenu');
  submenu.append(submenuList);

  contacts.classList.add('submenu__contacts-list');
  submenuInfo.append(contacts);

  langForm.classList.add('main-header__lang');
  langForm.classList.remove('main-nav__lang');
  mainHeaderWrapper.insertBefore(langForm, mainHeaderContacts);

  catalogToggle.classList.remove('visually-hidden');
  catalog.removeEventListener('mouseout', onCatalogOut);
  categories.addEventListener('click', onCategoriesClick);

  window.removeEventListener('scroll', onWindowScroll);
};

const getMenu = () => {
  if (window.innerWidth >= DESKTOP_WIDTH) {
    getDesktopMenu();
  } else {
    getMobileMenu();
  }
};

getMenu();

window.addEventListener('resize', getMenu);
