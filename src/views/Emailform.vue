<template>
    <div>
        <h2>Send Email with Attachment</h2>
        <form @submit.prevent="sendEmail">
            <div>
                <label for="to">Recipient Email:</label>
                <input type="email" v-model="to" required />
            </div>
            <div>
                <label for="subject">Subject:</label>
                <input type="text" v-model="subject" required />
            </div>
            <div>
                <label for="text">Message:</label>
                <textarea v-model="text"></textarea>
            </div>
            <div>
                <label for="attachment">Attachment:</label>
                <input type="file" @change="onFileChange" />
            </div>
            <button type="submit">Send Email</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const to = ref('');
const subject = ref('');
const text = ref('');
const attachment = ref(null);

const onFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        attachment.value = {
            content: btoa(e.target.result), // Base64编码
            filename: file.name,
            type: file.type,
        };
    };

    reader.readAsBinaryString(file);
};

const sendEmail = async () => {
    try {
        const data = {
            to: to.value,
            subject: subject.value,
            text: text.value,
            attachment: attachment.value,
        };
        await axios.post('http://localhost:3000/send-email', data);
        alert('Email sent successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send email');
    }
};
</script>