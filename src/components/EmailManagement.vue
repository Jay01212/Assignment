<template>
    <div class="email-management">
        <h2>邮件管理</h2>
        <form @submit.prevent="sendEmail">
            <div class="mb-3">
                <label for="to" class="form-label">收件人</label>
                <input type="email" class="form-control" id="to" v-model="email.to" required>
            </div>
            <div class="mb-3">
                <label for="subject" class="form-label">主题</label>
                <input type="text" class="form-control" id="subject" v-model="email.subject" required>
            </div>
            <div class="mb-3">
                <label for="body" class="form-label">内容</label>
                <textarea class="form-control" id="body" v-model="email.body" rows="5" required></textarea>
            </div>
            <div class="mb-3">
                <label for="attachment" class="form-label">附件</label>
                <input type="file" class="form-control" id="attachment" @change="handleFileUpload">
            </div>
            <button type="submit" class="btn btn-primary">发送邮件</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    name: 'EmailManagement',
    setup() {
        const email = ref({
            to: '',
            subject: '',
            body: '',
            attachment: null
        });

        const handleFileUpload = (event) => {
            email.value.attachment = event.target.files[0];
        };

        const sendEmail = async () => {
            try {
                const formData = new FormData();
                formData.append('to', email.value.to);
                formData.append('subject', email.value.subject);
                formData.append('body', email.value.body);
                if (email.value.attachment) {
                    formData.append('attachment', email.value.attachment);
                }

                // 假设你有一个后端API来处理邮件发送
                const response = await axios.post('/api/send-email', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.success) {
                    alert('邮件发送成功！');
                    // 清空表单
                    email.value = { to: '', subject: '', body: '', attachment: null };
                } else {
                    throw new Error(response.data.message);
                }
            } catch (error) {
                console.error('发送邮件失败:', error);
                alert('发送邮件失败，请稍后重试。');
            }
        };

        return {
            email,
            handleFileUpload,
            sendEmail
        };
    }
};
</script>