import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dog: resolve(__dirname, 'dog-services.html'),
        cat: resolve(__dirname, 'cat-services.html'),
        area: resolve(__dirname, 'service-area.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        blog1: resolve(__dirname, 'blog/why-professional-scooping-beats-diy.html'),
        blog2: resolve(__dirname, 'blog/hidden-dangers-of-pet-waste.html'),

        privacy: resolve(__dirname, 'privacy-policy.html'),
        faqs: resolve(__dirname, 'faqs.html'),
        careers: resolve(__dirname, 'careers.html'),
        agreement: resolve(__dirname, 'service-agreement.html'),
      },
    },
  },
});
