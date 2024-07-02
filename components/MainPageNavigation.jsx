'use client';

export default function MainPageNavigation() {

  const aboutHandler = () => {
    document.querySelector('#about')
      .scrollIntoView({behavior: 'smooth'});
  }

  const contactsHandler = () => {
    document.querySelector('#contacts')
      .scrollIntoView({behavior: 'smooth'});
  }

  return (
    <nav id="home-navigation" className="home-navigation">
      <span
        className="home-navigation__link"
        onClick={aboutHandler}
      >About</span>
      <span
        className="home-navigation__link"
        onClick={contactsHandler}
      >Contacts</span>
    </nav>
  )
}