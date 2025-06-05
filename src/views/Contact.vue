<template>
    <div class="contact-page">
        <h1>Contact Us</h1>
        <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input v-model="form.name" type="text" id="name" required />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input v-model="form.email" type="email" id="email" required />
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea v-model="form.message" id="message" rows="5" required></textarea>
            </div>
            <button type="submit">Send</button>
        </form>
        <div v-if="submitted" class="success-message">
            Thank you for contacting us!
        </div>
    </div>
</template>

<script>
export default {
    name: "Contact",
    data() {
        return {
            form: {
                name: "",
                email: "",
                message: ""
            },
            submitted: false
        };
    },
    methods: {
        submitForm() {
            this.submitted = true;
            this.form = { name: "", email: "", message: "" };
            setTimeout(() => {
                this.submitted = false;
            }, 3000);
        }
    }
};
</script>

<style scoped>
.contact-page {
    max-width: 500px;
    margin: 40px auto;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    box-sizing: border-box;
    width: 100%;
}
.contact-form .form-group {
    margin-bottom: 16px;
}
.contact-form label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
}
.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
}
.contact-form button {
    padding: 10px 24px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
    display: block;
}
.contact-form button:hover {
    background: #0056b3;
}
.success-message {
    margin-top: 20px;
    color: #28a745;
    font-weight: bold;
    text-align: center;
}

/* Responsive styles */
@media (max-width: 600px) {
    .contact-page {
        padding: 12px;
        margin: 16px;
        max-width: 100%;
    }
    .contact-form input,
    .contact-form textarea {
        font-size: 0.95rem;
        padding: 7px;
    }
    h1 {
        font-size: 1.5rem;
        text-align: center;
    }
    .contact-form button {
        font-size: 1rem;
        padding: 10px;
        width: 100%;
        max-width: none;
    }
}
</style>