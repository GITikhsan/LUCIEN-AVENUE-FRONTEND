<template>
    <div class="container py-5 text-center">
        <h2 class="fw-bold mb-3">
            We are here for you,<br />
            contact us at <span class="black">anytime</span>
        </h2>
        <p class="mb-5 text-muted">
            Need help or have questions about our services, or just want to talk to us? Please contact us.
        </p>

        <div class="row g-4 justify-content-center">
            <!-- WhatsApp -->
            <div class="col-md-4">
                <div class="card card-custom p-4">
                    <div class="icon-circle whatsapp mx-auto">
                        <i class="bi bi-whatsapp fs-4"></i>
                    </div>
                    <h5 class="fw-bold">Chat Now</h5>
                    <p class="text-muted">Via WhatsApp</p>
                    <a
                        href="https://wa.me/6282281899371"
                        target="_blank"
                        rel="noopener"
                        class="btn btn-whatsapp mt-2"
                    >
                        Start Chat <i class="bi bi-arrow-right ms-1"></i>
                    </a>
                </div>
            </div>

            <!-- Email -->
            <div class="col-md-4">
                <div class="card card-custom p-4">
                    <div class="icon-circle email mx-auto">
                        <i class="bi bi-envelope-paper fs-4"></i>
                    </div>
                    <h5 class="fw-bold">Email Us</h5>
                    <p class="text-muted">From your email app</p>
                    <a
                        href="mailto:Admin@lucien.com"
                        class="fw-semibold mb-0 d-block text-decoration-none"
                    >
                        Admin@lucien.com
                    </a>
                </div>
            </div>

            <!-- Phone -->
            <div class="col-md-4">
                <div class="card card-custom p-4">
                    <div class="icon-circle phone mx-auto">
                        <i class="bi bi-telephone fs-4"></i>
                    </div>
                    <h5 class="fw-bold">Call or Text Us</h5>
                    <p class="text-muted">From your phone</p>
                    <a
                        href="tel:+6282281899371"
                        class="fw-semibold mb-0 d-block text-decoration-none"
                    >
                        +62 822-8189-9371
                    </a>
                </div>
            </div>
        </div>

        <div class="mt-5 text-muted">
            We'll get back to you as soon as possible. Our team is available 8am–6pm on weekdays.
        </div>
    </div>
</template>

<style scoped>
.card-custom {
    border: none;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0,0,0,0.05);
    transition: transform 0.2s ease;
}
.card-custom:hover {
    transform: translateY(-3px);
}
.icon-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
}
.whatsapp { background-color: #e6f4ea; color: #25D366; }
.email { background-color: #f3e8fd; color: #8e44ad; }
.phone { background-color: #ffe9e7; color: #e74c3c; }
.btn-whatsapp {
    background-color: #25D366;
    color: white;
}
.btn-whatsapp:hover {
    background-color: #1ebe5d;
}
.black {
    color: #000;
}
</style>