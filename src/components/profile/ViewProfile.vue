<template>
    <div class="view-profile container">
        <div class="card">
            <h2 class="deep-purple-text">Chat Room ({{profile.alias}})</h2>
                   <ul class="comments collection">
            <li v-for="(com, index) in comments" :key="index">
                <div class="deep-purple-text">{{com.from}}</div>
                <div class="grey-text text-darken-2 comment">{{com.content}}</div>
            </li>
        </ul>
        <form @submit.prevent="addComment">
            <div class="field">
                <label for="comment">Add a comment</label>
                <input type="text" name="comment" v-model="comment">
                <p v-if="feedback" class="red-text">{{feedback}}</p>
            </div>
        </form>
        </div>
 
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name:'ViewProfile',
    data(){
        return{
            profile:'',
            comment:null,
            feedback:null,
            user:null,
            comments:[]
        }   
    },
    methods:{
        addComment(){
            if (this.comment) {
                this.feedback=null;
                db.collection('comment').add({
                    to: this.$route.params.id,
                    from:this.user.id,
                    content: this.comment,
                    time: Date.now()
                }).then(()=>{
                    this.comment=null;  
                })
            } else {
                this.feedback="Silahkan isi comment terlebih dahulu!";
            }
        }
    },
    created(){
        let ref = db.collection('users')

        ref.doc(this.$route.params.id).get().then(user=>{
            console.log(user, "user");
            this.profile = user.data();
        })

        ref.where('user_id', '==', firebase.auth().currentUser.uid).get().then(docs=>{
                docs.forEach(doc=> {
                    this.user=doc.data();
                    this.user.id=doc.id;
                });
        })

        db.collection('comment').where('to', '==', this.$route.params.id).onSnapshot((snapshot)=>{
            snapshot.docChanges().forEach(change=>{
                if (change.type =='added') {
                    this.comments.unshift({
                        from: change.doc.data().from,
                        content: change.doc.data().content
                    })
                } else {
                    
                }
            })
        })

    }
}
</script>

<style>
.card{
    padding: 20px;
    margin-top: 50px;
}
.view-profile h2{
    font-size: 2em;
    margin-top: 0;
}
.view-profile li{
    padding: 10px;
    border-bottom: 1px solid #cecaca;
}
.comment{
        background-color: aqua;
        color: #fff;
        border-radius: 50px;
        text-align: center;
        padding: 10px;
}
.comments{
    max-height: 300px;
    overflow: auto;
}
.comments ::-webkit-scrollbar{
    widows: 2px;
}
.comments ::-webkit-scrollbar-track{
    background: #ddd;
}
.comments::-webkit-scrollbar-thumb{
    background: #aaa    ;
}
</style>