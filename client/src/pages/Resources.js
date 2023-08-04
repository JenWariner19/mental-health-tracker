import React from "react";

const Resources = () => {
  return (
    <div>
      <header>
        <h1>Resources Page</h1>
      </header>
      <p>
        Asking for help is never a sign of weekness nor inadequacy; instead
        shows that there is strength in vulnerability and an act of courage. If
        you or a loved one is in need of help, expirencing a crisis, or just
        need someone to talk to, please reach out to one of the following
        resources below.
      </p>
      <section>
        <h2>Mental Health</h2>
        <ul>
          <li>
            <a href="https://sprc.org/">Suicide Prevention Resource</a>
          </li>
          <li>
            <a href="https://adaa.org/understanding-anxiety/panic-disorder-agoraphobia/symptoms">
              Anxiety and Depression Assoiciation of America
            </a>
          </li>
          <li>
            <a href="http://schizophrenia.com/">Schizophrenia</a>
          </li>
          <li>
            <a href="https://www.postpartum.net/">
              Postpartum Support International
            </a>
          </li>
          <li>
            <a href="https://anad.org/">
              National Assoiciation of Anorexia Nervosa and Associated Disorders
            </a>
          </li>
          <li>
            <a href="https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Borderline-Personality-Disorder/">
              Bipolar Disorder
            </a>
          </li>
          <li>
            <a href="https://www.nami.org/About-Mental-Illness/Mental-Health-Conditions/Posttraumatic-Stress-Disorder">
              Posttraumatic Stress Disorder
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Substance</h2>
        <ul>
          <li>
            <a href="https://smokefree.gov/">Smokefree</a>
          </li>
          <li>
            <a href="https://www.alcoholscreening.org/#/home">Alcohol Screening</a>
          </li>
          <li>
            <a href="https://drugfree.org/">Drug Screening</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Counseling: Get Help</h2>
        <ul>
          <li>
            <a href="https://www.na.org/">Narcostics Anonymous</a>
          </li>
          <li>
            <a href="https://www.aa.org/">Alcoholics Anonymous</a>
          </li>
          <li>
            <a href="https://eatingdisordersanonymous.org/">
              Eating Disorders Anonymous
            </a>
          </li>
          <li>
            <a href="https://www.dbsalliance.org/support/chapters-and-support-groups/find-a-support-group/">
              Depression and Bipolar Support
            </a>
          </li>
        </ul>
      </section>

      <footer>
        <p>
          If you would like to donate to a mental health organization please
          refer to the link for a list of organizations:
        </p>
        <p>
          <a href="https://www.nami.org/About-NAMI/Donate-to-NAMI">
            Donate Here
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Resources;
