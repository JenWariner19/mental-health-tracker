import React from "react";
import './resources.css'

const Resources = () => {
  return (
    <div>
      <p className='message'>
        Asking for help is never a sign of weakness nor inadequacy; instead it
        shows strength in vulnerability and an act of courage. If
        you or a loved one is in need of help, experiencing a crisis, or just
        need someone to talk to, please reach out to one of the following
        resources below.
      </p>
      <p className='emergency'>If you are in need of immediate assistance, please call the Suicide Prevention Lifeline at 1-800-273-TALK (8255), or dial 911 in case of emergency.</p>
      <section>
        <h2 className='health-header'>Mental Health</h2>
        <ul>
          <li className='link-items'>
            <a className='link-text' href="https://sprc.org/">Suicide Prevention Resource</a>
          </li>
          <li className='link-items'>
            <a className='link-text' href="https://adaa.org/understanding-anxiety/panic-disorder-agoraphobia/symptoms">
              Anxiety and Depression Association of America
            </a>
          </li>
          <li className='link-items'>
            <a className='link-text' href="http://schizophrenia.com/">Schizophrenia</a>
          </li>
          <li className='link-items'>
            <a className='link-text' href="https://www.postpartum.net/">
              Postpartum Support International
            </a>
          </li>
          <li className='link-items'>
            <a className='link-text' href="https://anad.org/">
              National Association of Anorexia Nervosa and Associated Disorders
            </a>
          </li>
          <li className='link-items'>
            <a className='link-text' href="https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Borderline-Personality-Disorder/">
              Bipolar Disorder
            </a>
          </li>
          <li className='link-items'>
            <a className='link-text' href="https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Posttraumatic-Stress-Disorder">
              Post-traumatic Stress Disorder
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className='health-header'>Substance</h2>
        <ul>
          <li className='link-items'>
            <a className='link-text' href="https://smokefree.gov/">Smoke-free</a>
          </li>
          <li className='link-items'>
            <a className='link-text' href="https://www.alcoholscreening.org/#/home">Alcohol Screening</a>
          </li>
          <li className='link-items'>
            <a className='link-text' href="https://drugfree.org/">Drug Screening</a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className='health-header'>Counseling: Get Help</h2>
        <ul>
          <li className='link-items'>
            <a className='link-text' href="https://www.na.org/">Narcotics Anonymous</a>
          </li>
          <li className='link-items'>
            <a className='link-text' href="https://www.aa.org/">Alcoholics Anonymous</a>
          </li>
          <li className='link-items'>
            <a className='link-text' href="https://eatingdisordersanonymous.org/">
              Eating Disorders Anonymous
            </a>
          </li>
          <li className='link-items'>
            <a className='link-text' href="https://www.dbsalliance.org/support/chapters-and-support-groups/find-a-support-group/">
              Depression and Bipolar Support
            </a>
          </li>
        </ul>
      </section>

      <footer>
        <p className='donate-message'>
          If you would like to donate to a mental health organization, please
          refer to the link below:
        </p>
        <p>
          <a className='donate-message-link' href="https://www.nami.org/About-NAMI/Donate-to-NAMI">
            Donate Here
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Resources;
