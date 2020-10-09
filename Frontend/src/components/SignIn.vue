<template>
    <div>
        <article>
            <form id="firstBox">
                <h2>Connexion</h2>
                <input id="email"
                    type="email"
                    placeholder="Email"
                    v-model="userInfo.email"
                    required
                />
                <input id="password"
                    type="password"
                    placeholder="Votre mot de passe"
                    v-model="userInfo.password"
                    required
                />
                <a href="#">Mot de passe oublié ?</a><br /><br />
                <a href="#" v-on:click="showRegisterForm">Créer un compte</a>
                <button v-on:click="login">Valider</button>
            </form>
            <form name="myform" id="box">
                <h2>Créer mon compte</h2>
                <p>Merci d'utiliser votre email professionnel</p>
                <input
                    type="text"
                    id="nom"
                    placeholder="Nom*"
                    v-model="signupInfo.nom"
                    required
                />
                <input
                    type="text"
                    id="prenom"
                    placeholder="Prénom*"
                    v-model="signupInfo.prenom"
                    required
                />
                <input
                    id="email"
                    type="email"
                    placeholder="Email*"
                    v-model="signupInfo.email"
                    required
                />
                <input
                    id="dept"
                    type="text"
                    placeholder="Département/secteur"
                    v-model="signupInfo.departement_entreprise"
                />
                <input
                    id="password"
                    type="password"
                    placeholder="Mot de passe*"
                    v-model="signupInfo.password"
                    required
                />
                <button id="btn" type="submit" v-on:click="registerUser">
                    Créer mon compte
                </button>
                <p class="mendatory">
                    Les champs comportant une * sont obligatoires
                </p>
                <a href="#" v-on:click="showLoginForm"
                    >Retour à la page de Connexion</a
                >
            </form>
        </article>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            signUp: false,
            userInfo: {
                email: "",
                password: ""
            },
            signupInfo: {
                nom: "",
                prenom: "",
                email: "",
                departement_entreprise: "",
                password: ""
            }
        };
    },
    methods: {
        login() {
            // méthode de connexion qui fait appel à la méthode retrieveToken présente dans notre store
            this.$store
                .dispatch("retrieveToken", {
                    email: this.userInfo.email,
                    password: this.userInfo.password
                })
                .then(() => {
                    // this.$router.push("/");
                    // window.location.reload();
                });
        },
        registerUser() {
            // méthode de création de compte qui fait appel à la méthode registerUser présente dans notre store
            // let nom = document.myform.nom.value;
            // let prenom = document.myform.prenom.value;

            // if (nom == null || nom == "") {
            //     alert("Name can't be blank");
            //     return false;
            // } else if (prenom == null || prenom == "") {
            //     alert("Password must be at least 6 characters long.");
            //     return false;
            // }

            let user = this.$store.dispatch("registerUser", this.signupInfo);
            if (user.error) {
                alert(user.error);
            } else {
                alert(
                    "Création de compte réussie, merci de vous reconnecter pour avoir accès à toutes les fonctions du site."
                );
                this.$router.push("/");
                window.location.reload();
            }
        },
        showRegisterForm() {
            // fonction pour montrer le formulaire de création de compte
            const registerForm = document.getElementById("box");
            const loginForm = document.getElementById("firstBox");
            if (registerForm.style.display === "none") {
                registerForm.style.display = "block";
                loginForm.style.display = "none";
            } else {
                registerForm.style.display = "none";
            }
        },
        showLoginForm() {
            // fonction pour montrer le formulaire de connexion
            const registerForm = document.getElementById("box");
            const loginForm = document.getElementById("firstBox");
            if (loginForm.style.display === "none") {
                loginForm.style.display = "block";
                registerForm.style.display = "none";
            } else {
                loginForm.style.display = "none";
            }
        }
    }
};
</script>

<style lang="scss" scoped>
body {
    margin: 0;
    padding: 0;
}

#box {
    display: none;
    width: 50%;
    padding: 40px;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: #192c4ae3;
    border-radius: 10px;
    h2 {
        color: white;
        text-transform: uppercase;
        font-weight: 500;
    }
    a {
        text-decoration: none;
        color: white;
        font-size: 25px;
        &:hover {
            color: #dd1d1dc4;
        }
    }
    input[type="text"] {
        border: 0;
        background: none;
        display: block;
        width: 300px;
        margin: 20px auto;
        text-align: center;
        font-size: 25px;
        border: 2px solid #fff;
        padding: 14px 10px;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.25s;
    }
    input[type="password"] {
        border: 0;
        background: none;
        display: block;
        width: 300px;
        margin: 20px auto;
        text-align: center;
        font-size: 25px;
        border: 2px solid #fff;
        padding: 14px 10px;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.25s;
    }
    input[type="email"] {
        border: 0;
        background: none;
        display: block;
        width: 300px;
        margin: 20px auto;
        text-align: center;
        font-size: 25px;
        border: 2px solid #fff;
        padding: 14px 10px;
        outline: none;
        color: white;
        border-radius: 24px;
        transition: 0.25s;
    }
    p {
        color: white;
        text-decoration: none;
        font-size: 20px;
    }
}
#box input[type="text"]:focus,
#box input[type="email"]:focus,
#box input[type="password"]:focus {
    width: 400px;
    border-color: #dd1d1dc4;
}

#box button {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    font-size: 23px;
    font-weight: 700;
    border: 2px solid #dd1d1dc4;
    padding: 20px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer;
    &:hover {
        color: white;
        background: #dd1d1dc4;
    }
}

#firstBox {
    width: 50%;
    padding: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background: #192c4af5;
    border-radius: 10px;
}

#firstBox h2 {
    color: white;
    text-transform: uppercase;
    font-weight: 500;
}

#firstBox input[type="email"],
#firstBox input[type="password"] {
    border: 0;
    background: none;
    display: block;
    width: 300px;
    margin: 20px auto;
    text-align: center;
    font-size: 25px;
    border: 2px solid #fff;
    padding: 14px 10px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
}

#firstBox a {
    color: white;
    text-decoration: none;
    padding-top: 10px;
    font-size: 20px;
}

#firstBox p {
    font-size: 30px;
}

#firstBox input[type="email"]:focus,
#firstBox input[type="password"]:focus {
    width: 400px;
    border-color: #dd1d1dc4;
}

#firstBox button {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    font-size: 23px;
    font-weight: 700;
    border: 2px solid #dd1d1dc4;
    padding: 20px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer;
    &:hover {
        color: white;
        background: #dd1d1dc4;
    }
}
#email::placeholder, #password::placeholder, #nom::placeholder, #prenom::placeholder, #dept::placeholder{
    color: white;
}

@media screen and (max-width: 1024px) {
#box {
        display: none;
        width: 70%;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -55%);
        text-align: center;
        background: #192c4ae3;
        border-radius: 10px;
        a {
            font-size: 16px;
        }
        input[type="text"] {
            width: 300px;
            font-size: 18px;
        }
        input[type="password"] {
            width: 300px;
            font-size: 18px;
        }
        input[type="email"] {
            width: 300px;
            font-size: 18px;
        }
        p {
            color: white;
            text-decoration: none;
            font-size: 18px;
        }
    }

    #box input[type="text"]:focus,
    #box input[type="email"]:focus,
    #box input[type="password"]:focus {
        width: 350px;
    }

    #box button {
        font-size: 18px;
    }

    #firstBox {
        width: 70%;
        a {
            font-size: 18px;
        }
        button {
            font-size: 18px;
        }
    }

    #firstBox input[type="email"],
    #firstBox input[type="password"] {
        width: 300px;
        font-size: 18px;
    }

    #firstBox input[type="email"]:focus,
    #firstBox input[type="password"]:focus {
        width: 350px;
    }

}
@media screen and (max-width: 768px) {
#box {
        display: none;
        width: 70%;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        background: #192c4ae3;
        border-radius: 10px;
        a {
            font-size: 16px;
        }
        input[type="text"] {
            width: 250px;
            font-size: 18px;
        }
        input[type="password"] {
            width: 250px;
            font-size: 18px;
        }
        input[type="email"] {
            width: 250px;
            font-size: 18px;
        }
        p {
            color: white;
            text-decoration: none;
            font-size: 18px;
        }
    }

    #box input[type="text"]:focus,
    #box input[type="email"]:focus,
    #box input[type="password"]:focus {
        width: 300px;
    }

    #box button {
        font-size: 18px;
    }

    #firstBox {
        width: 70%;
        a {
            font-size: 18px;
        }
        button {
            font-size: 18px;
        }
    }

    #firstBox input[type="email"],
    #firstBox input[type="password"] {
        width: 250px;
        font-size: 18px;
    }

    #firstBox input[type="email"]:focus,
    #firstBox input[type="password"]:focus {
        width: 300px;
    }

}
@media screen and (max-width: 425px) {
#box {
        display: none;
        width: 70%;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        background: #192c4ae3;
        border-radius: 10px;
        a {
            font-size: 16px;
        }
        input[type="text"] {
            width: 180px;
            font-size: 16px;
        }
        input[type="password"] {
            width: 180px;
            font-size: 16px;
        }
        input[type="email"] {
            width: 180px;
            font-size: 16px;
        }
        p {
            color: white;
            text-decoration: none;
            font-size: 16px;
        }
    }

    #box input[type="text"]:focus,
    #box input[type="email"]:focus,
    #box input[type="password"]:focus {
        width: 200px;
    }

    #box button {
        font-size: 16px;
    }

    #firstBox {
        width: 70%;
        a {
            font-size: 16px;
        }
        button {
            font-size: 16px;
        }
    }

    #firstBox input[type="email"],
    #firstBox input[type="password"] {
        width: 180px;
        font-size: 16px;
    }

    #firstBox input[type="email"]:focus,
    #firstBox input[type="password"]:focus {
        width: 200px;
    }
}
@media screen and (max-width: 375px) {
    #box {
        display: none;
        width: 70%;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        background: #192c4ae3;
        border-radius: 10px;
        a {
            font-size: 16px;
        }
        input[type="text"] {
            width: 150px;
            font-size: 16px;
        }
        input[type="password"] {
            width: 150px;
            font-size: 16px;
        }
        input[type="email"] {
            width: 150px;
            font-size: 16px;
        }
        p {
            color: white;
            text-decoration: none;
            font-size: 16px;
        }
    }

    #box input[type="text"]:focus,
    #box input[type="email"]:focus,
    #box input[type="password"]:focus {
        width: 200px;
    }

    #box button {
        font-size: 16px;
    }

    #firstBox {
        width: 70%;
        a {
            font-size: 16px;
        }
        button {
            font-size: 16px;
        }
    }

    #firstBox input[type="email"],
    #firstBox input[type="password"] {
        width: 150px;
        font-size: 16px;
    }

    #firstBox input[type="email"]:focus,
    #firstBox input[type="password"]:focus {
        width: 170px;
    }
}
</style>