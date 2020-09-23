<template>
    <div id="wrapper">
        <div id="aboutme">
        <h2>Mes informations personnelles</h2>
        <p>Nom : {{currentUser.nom}} </p>
        <p>Prénom : {{currentUser.prenom}} </p>
        <p>Adresse Email : {{currentUser.email}} </p>
        <button v-on:click="deleteAccount">Supprimer mon compte</button>
        </div>  
        <div id="second-wrapper">
            <div id="shared-articles">
                <h3>Articles que vous avez partagé</h3>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum culpa nam accusantium magnam, unde quae blanditiis vel saepe ratione, nobis placeat? Sit dolor fugit consequuntur reiciendis saepe unde eveniet voluptates?
            </div>
            <div id="published-articles">
                <h3>Articles que vous avez publié</h3>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam neque dignissimos suscipit, magni totam voluptatibus facere, excepturi culpa vero in corporis eaque soluta, inventore nobis obcaecati nihil modi quae quia.
            </div>
        </div>
        <div class="footer">
        <Footer />
        </div>
    </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import { mapState } from 'vuex';
import axios from 'axios';

export default {
    components: {
            Footer,
    },
    computed: {
        ...mapState(["currentUser"]),
    },
    methods: {
    deleteAccount(){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);
        let response = confirm(`Etes vous certains de vouloir supprimer votre compte ?`);
            if (response){
                axios.delete(`http://localhost:3000/users/delete/${currentUser.userId}`);
                localStorage.clear();
                this.$router.push('/');
                window.location.reload();
            }
        }
    },
}

</script>

<style lang="scss" scoped>
#wrapper{
    margin-top: 10%;
    #aboutme{
        text-align: center;
    }
}
#second-wrapper {
    display: flex;
    margin: 2%;
    justify-content: space-around;
}
.footer{
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>