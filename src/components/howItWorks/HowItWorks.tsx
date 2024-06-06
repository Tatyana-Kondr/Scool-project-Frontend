import React from 'react';
import s from './howItWorks.module.css';

export default function HowItWorks() {
  return (
    <div className={s.container}>
      <h1 className={s.heading}>How It Works</h1>
      <p className={s.intro}>
        Our website dedicated to helping homeless animals provides a valuable platform for those who seek to find a new home for abandoned animals. The work of our website includes several key aspects:
      </p>
      <ul className={s.list}>
        <li className={s.listItem}>
          <h2 className={s.listItemTitle}>Posting Ads</h2>
          <p className={s.paragraph}>
            Anyone who finds a stray animal can easily place an ad about it on our website. This may include information about the animal, its photos, age, gender, breed (if known), as well as contact information to contact those interested in adoption.
          </p>
        </li>
        <li className={s.listItem}>
          <h2 className={s.listItemTitle}>Animal Search</h2>
          <p className={s.paragraph}>
            Site visitors can use the search functionality to find animals they could adopt. This allows them to view available ads, filter the results by various parameters (for example, type of animal, location, etc.) and find suitable candidates for adoption.
          </p>
        </li>
        <li className={s.listItem}>
          <h2 className={s.listItemTitle}>Communication</h2>
          <p className={s.paragraph}>
            Our site also provides a means of communication between those who posted an ad about an animal and potential adoptive parents. This can be a built-in messaging system or specifying contact information for direct communication.
          </p>
        </li>
        <li className={s.listItem}>
          <h2 className={s.listItemTitle}>Educational Content</h2>
          <p className={s.paragraph}>
            Our website may contain information on how to care for animals, the adoption process, the importance of sterilization, etc. This helps to keep visitors informed and increases the likelihood of a successful adoption.
          </p>
        </li>
        <li className={s.listItem}>
          <h2 className={s.listItemTitle}>Community Support</h2>
          <p className={s.paragraph}>
            Creating a community of support and sharing experiences can also be an important aspect of our website. This may include forums, blogs, the ability to share adoption stories and photos of new animal homes.
          </p>
        </li>
      </ul>
      <p className={s.conclusion}>
        The overall result of our website is that it facilitates the adoption process and helps more homeless animals to be found by caring and loving families.
      </p>
    </div>
  );
}

