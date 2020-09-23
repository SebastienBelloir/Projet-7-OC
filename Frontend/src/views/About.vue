<template>
  <div id="About">
    <section>
      <h2>{{title}}</h2>

      <article id="CGU">
        <h3>Condition générale d'utilisation</h3>
        <p>
          L'accès à cet espace et son utilisation est strictement réservé au membre du personnel de Groupomania.
          <br />L'inscription à cet espace sous entend l'acceptation de la charte "Espace Groupomania" telle que décrite ci dessous.
        </p>
      </article>


      <article id="charte">
        <h3>Charte de l'Espace Groupomania</h3>
        <ul>
          <li>Article 1: Le respect de toutes les personnes est primordial pour bien évoluer au sein du forum. Aucune insulte, moquerie en tout genre n'est donc tolérée, sous toutes les formes (Même pas sous forme de ***).</li>
          <br />
          <li>Article 2: Tout propos injurieux, violents, diffamatoires, raciste, xénophobe, pédophiles, pornographiques est interdit.</li>
          <br />
          <li>Article 3: Le double poste est interdit, un bouton "Modifier" existe et vous permet de modifier votre message.</li>
          <br />
          <li>Article 4: Attention à votre écriture. Vous devez écrire un français compréhensible, on ne vous demande pas des phrases irréprochables, mais faites un effort! Le langage sms est donc à proscrire. Les messages écrits partiellement ou entièrement en majuscule sont aussi à proscrire pour le confort de tous. (Que ce soit pour un titre, message ou toutes autres formes écrites)</li>
          <br />
          <li>Article 5: Pub et spam sont interdits.</li>
          <br />
          <li>Article 6: Votre pseudo doit avoir un minimum de construction, par exemple: pas de "akejfj". Il ne doit pas non plus comporter d'éléments ne respectant pas l'un de ces articles.</li>
          <br />
          <li>Article 7: Le double compte est interdit.</li>
          <br />
          <li>Article 8: Si vous rencontrez un problème sur le forum vous vous devez de contacter un administrateur.</li>
          <br />
          <li>Article 9: Le règlement est susceptible de changer à tout instant, vous êtes donc tenu de vous informer des changements.</li>
        </ul>
      </article>


      <article id="legals">
        <h3>Mentions Légales</h3>
        <em>Dernière mise à jour le 06/03/2020</em>
        <p>La société Groupomania est une société par actions simplifiée au capital de 100 00 € immatriculée au RCS de Paris sous le n. 100 288 000 et dont le siège social est situé au 1 rue Perceval 29000 Midgar, France (N° TVA intracommunautaire : FR 87 201 000 000). Groupomania est représentée par M. Cloud Strife, son Président.</p>
        <p>Groupomania est une societé commerciale de distribution.</p>
        <p>Le Directeur de la Publication de la plateforme et le Directeur de l'Établissement Privé à Distance est M. Guetso.</p>Le site est hébergé par GitHub dont l’adresse est la suivante :
        <br />GitHub 29000 THEWORLD
      </article>


      <article id="contact">
        <h3>Nous contacter</h3>
        <ul>
          <li>Par téléphone : +33 0 00 00 00</li>
          <li>Par email : fakeemail@gmail.com</li>
          <li>Par courrier : Groupomania, 36 rue du chamboultou 79000 Niort, France</li>
        </ul>
      </article>


      <article id="CNIL">
        <h3>Droits relatifs aux données</h3>
        <p>
          Vous bénéficiez d’un droit d’accès et de rectification aux informations qui vous concernent, que vous pouvez exercer par email à l’adresse suivante:
          <strong>data-protection@groupomania.com</strong>
          <br />ou par courrier à l'adresse suivante :
          <strong>Groupomania, 1 rue Perceval 29000 Midgar, France</strong>. 
          <br> Vous pouvez également, pour des motifs légitimes, vous opposer au traitement des données vous concernant.
          Pour plus d’informations sur tous vos droits vous pouvez vous référer à notre Politique de Protection des Données Personnelles.
        </p>
      </article>
    </section>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  name: "About",
  data() {
    return {
      title: "A propos de votre Espace Groupomania"
    };
  },
  components:{
    Footer,
  }
};
</script>

<style lang="scss" scoped>
section{
  margin: 10%;
ul{
  list-style: none;
  }
}
</style>