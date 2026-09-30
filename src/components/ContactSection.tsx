import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const subject = encodeURIComponent(`Portfolio Contact - ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    // Open mail client with pre-filled data
    window.location.href = `mailto:salmajaghoua@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSending(false);
      setSent(true);
      toast({
        title: "Email client opened!",
        description: "Your default email app should open with the message ready to send.",
      });
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-accent mb-3">Let's connect</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-foreground">Get In Touch</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 min-w-0">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 min-w-0"
          >
            <p className="text-muted-foreground text-sm leading-relaxed">
              I'm always open to new opportunities, collaborations, and conversations about AI, Data Science, and tech innovation. 
              Feel free to reach out!
            </p>
            {[
              { icon: Mail, label: "salmajaghoua@gmail.com", href: "mailto:salmajaghoua@gmail.com" },
              { icon: Mail, label: "salma.jaghoua@etu.uae.ac.ma", href: "mailto:salma.jaghoua@etu.uae.ac.ma" },
              { icon: Github, label: "github.com/salmajaghoua", href: "https://github.com/salmajaghoua23" },
              { icon: Linkedin, label: "linkedin.com/in/salmajaghoua", href: "https://www.linkedin.com/in/salma-jaghoua-077709293/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BXWpnlNaKQj%2BwoiW3JAIr9w%3D%3D" },
              { icon: MapPin, label: "Morocco — Open to France mobility" },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 min-w-0"
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-card border border-border/50 flex items-center justify-center">
                  <item.icon size={18} className="text-accent" />
                </div>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors break-all min-w-0">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-4 min-w-0"
          >
            <div className="grid sm:grid-cols-2 gap-4 min-w-0">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full min-w-0 px-4 py-3 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full min-w-0 px-4 py-3 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
            <textarea
              placeholder="Your Message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
            />
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {sent ? (
                <>
                  <CheckCircle size={16} />
                  Message Ready!
                </>
              ) : sending ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Send size={16} />
                  </motion.div>
                  Opening...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
