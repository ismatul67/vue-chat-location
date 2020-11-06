<template>
    <div class="signup container">
        <form @submit.prevent="signup" class="card-panel">
            <h2 class="center deep-purple-text">Form Register</h2>
                <div class="field">
                    <label for="email">Email</label>
                    <input type="email" name="email" v-model="email">
                </div>
                <div class="field">
                    <label for="password">Pasword</label>
                    <input type="password" name="password" v-model="password">
                </div>
                <div class="field">
                    <label for="alias">Nama Lengkap</label>
                    <input type="text" name="alias" v-model="alias">
                </div>
                <p class="red-text center" v-if="feedback">{{feedback}}</p>
                <div class="center field">
                    <button class="btn deep-purple">Register</button>
                </div>
        </form>
    </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name: 'Signup',
    data(){
        return{
            email:null,
            password:null,
            alias:null,
            feedback:null,
            slug:null
        }
    },
    methods:{
        signup(){
            if (this.alias && this.email && this.password) {
                this.slug= slugify(this.alias,{
                    replacement:'-',
                    remove: /[$*_+`.()'"\-:@]/g,
                    lower:true
                })
                console.log(this.slug, "slug");
                let ref = db.collection('users').doc(this.slug)
                ref.get().then(doc=>{
                    console.log(doc, "doc");
                    if (doc.exists) {
                        this.feedback = "this alias already exists"
                    } else {
                        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(cred=>{
                            ref.set({
                                alias:this.alias,
                                geolocation: null,
                                user_id:cred.user.uid
                            })
                        }).then(()=>{
                            this.$router.push({name:'Gmap'})
                        })
                        this.feedback = "this alias is free to use"
                    }
                })
            } else {
                this.feedback= "Mohon lengkapi data terlebih dahulu!"
            }
        }
    }
}
</script>

<style>
.signup{
    max-width: 400px;
    margin-top: 60px;

}
.signup h2{
    font-size: 2.4em;

}
.signup field{
    margin-bottom: 16px;
}

</style>