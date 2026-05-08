const stats = [
  { value: "98%", label: "Natural Ingredients" },
  { value: "01/01", label: "Bespoke Sessions" }
];

const portfolio = [
  {
    title: "Natural Tresses",
    alt: "Close up of natural hair texture and shine",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlNVbb4EUFP0wK91k2dAjF96z41a2W-mf7W5HACMRmxkYHXS6R5FfGNFXL4M7C9pgAlVB_GMHoz3_mRjzmzSKYYtUpPps-6emlj9FRmoxyFz0gNlZ_Q_gBL32-l5ClRMOg1ThO8WpfnNV23uNNne24-seg6zMT4XeD1Lka5MwHh1fppMqpABFYr4xzJHtsElXSwkwgZLX2wD5W-J0GMWA3ShwSEsrqR8YchtDopJSCNal77gJeJI-x8Y7bF04oYx11qXhDwL6gN_g",
    ratio: "aspect-[3/4]"
  },
  {
    title: "Dewy Skin",
    alt: "Detail of dewy skin with minimal makeup",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9Euyu3moliLRKxvF1Xx2bOmMgFxhamIiJXSgXRUPqeEmL86h_m-wDG_atX2w_PmLirjp3xdKG_iKlWHACsIQKX5Nvq5ufQZXy8p1UUUIvKGxA40jNtnHq7-I1Pl1fefUanLkyj1rZ4oVETkk35WQ1Ru26kRtiLznBw2bZ2MB6SQfNuwsjIetkUs1wvapMQQxzO6IkiwZxIyb-LuDtEmcjOxGvhy5E-byTGztOeHJWYRJAEvvzvXNnDHksglURoSZAV36BX-OtqW8",
    ratio: "aspect-square"
  },
  {
    title: "Editorial",
    alt: "High fashion editorial beauty portrait",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3GoN1-w3GdAaEHZ4lybg2mFsQDQyembtgxjzkFspP9LRZCnPUXcmqxt2_C-o9Gj-yLRVW97WfWwgKq6ll1-AbF9gNWBeXFGO-Oasaw0VTYYN6Fd_4DOvJuy8iCERG1XHbSbx4JjTw2yjmCMIYTXA__PLCr0WV40pBk_ezA6GhIH_48Cv-Z3tB5AWkbhURm3-a3EBX_YaqDgaZir1mGlKGZJnulzI4ZX8Wu8bMNEKUzChgk7EOK-K1miEhHQCQ-KRvzBeUMoB_hRY",
    ratio: "aspect-square"
  },
  {
    title: "Precision",
    alt: "Detailed view of professionally shaped eyebrows",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoVEGb5oUaFL5DklibT8-VyaPGEWMYNDuFrowo2zhOWq2AgjFr5IH52nytnHhqDS7HsYhmUTk21d2LGYmz8tF2ovFBbplTHw5EquEp1oUwWT1096l5FH3TOtpHmCKjWMcnjNk7SRPbsJHFJXfwp84reXrJQN0BsaiJgHgg67HKiAST8POaEqKNxrwdaLVlln4-0srufZS9Q-drTc8tNdtPXDi777dbFRAb6MebAQ8129CP4V6hLTU72W1rHHFf4WBp7u-sxvBkkxw",
    ratio: "aspect-[3/4]"
  }
];

const footerLinks = ["Insta", "TikTok", "Vogue"];

function Icon({ children, filled = false }: { children: string; filled?: boolean }) {
  return <span className={`material-symbols-outlined ${filled ? "material-filled" : ""}`}>{children}</span>;
}

export default function Home() {
  return (
    <div className="pb-28">
      <header className="sticky top-0 z-50 border-b border-[#ee2b8c]/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="rounded bg-[#ee2b8c] p-1">
              <Icon filled>grid_view</Icon>
            </div>
            <h1 className="text-xl font-extrabold tracking-tighter text-[#221019]">
              CLÉ<span className="text-[#ee2b8c] underline decoration-2 underline-offset-4">BEAUTY</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-[#221019]" aria-label="Carrinho">
              <Icon>shopping_bag</Icon>
            </button>
            <button className="p-2 text-[#221019]" aria-label="Menu">
              <Icon>menu</Icon>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl">
        <section id="services" className="px-4 pt-6 pb-12">
          <div className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl bg-[#ddd7db] p-6 shadow-[0_20px_60px_rgba(34,16,25,0.12)]">
            <img
              alt="Beautiful model with minimalist dewy makeup portrait"
              className="absolute inset-0 h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_f5_n0vI58D_VfZW3L0Qm4W8v96pudZ72uCV8Hh2WQ1fPcLx88kKw90aa6EU9SVswyzIIMgXgksdjA-LkPeU1KFL0a4s72u9uuqBPwC3oWmT1waHUr43FTHym3i87IqF7k-8ylLZ6eR23FCvxjGRBFasdsQFwqFx9jEa7ahUM7BVIemY6Y0gzejOAv6VCkatk7oYMhjqjaiyIadMV2Kl0ooCEcS8xhNa6VzOL9V1Kp-n9JeScJMcJDqmHTeSRx2v14ikmb5C5eBw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#221019]/85 via-[#221019]/15 to-transparent" />
            <div className="absolute right-4 top-4 flex w-16 flex-wrap gap-1 opacity-60">
              <span className="h-3 w-3 bg-[#ee2b8c]" />
              <span className="h-3 w-3 bg-white" />
              <span className="h-3 w-3 bg-[#ee2b8c]/40" />
              <span className="h-3 w-3 bg-[#ee2b8c]" />
            </div>
            <div className="relative z-10 space-y-4">
              <h2 className="max-w-[320px] text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                Minimalist <br />
                Artistry, <span className="italic text-[#ee2b8c]">Refined.</span>
              </h2>
              <p className="max-w-[280px] text-sm text-slate-200">
                Digital-luxe environment for the modern aesthetic enthusiast. Natural hair and editorial makeup.
              </p>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ee2b8c] py-4 font-bold text-white shadow-lg shadow-[#ee2b8c]/30">
                Explore Services
                <span className="text-sm">›</span>
              </button>
            </div>
          </div>
        </section>

        <section className="pixel-bg grid grid-cols-2 gap-4 px-4 py-8">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-lg border-l-4 border-[#ee2b8c] bg-white p-5 shadow-sm">
              <span className="mb-1 block text-2xl font-black text-[#ee2b8c]">{stat.value}</span>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{stat.label}</p>
            </article>
          ))}
        </section>

        <section id="portfolio" className="px-4 py-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-[#ee2b8c]">Portfolio</span>
              <h3 className="text-2xl font-extrabold text-[#221019]">The Gallery</h3>
            </div>
            <div className="flex gap-1">
              <span className="h-2 w-2 bg-[#ee2b8c]" />
              <span className="h-2 w-2 bg-[#ee2b8c]/50" />
              <span className="h-2 w-2 bg-[#ee2b8c]/20" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3">
              {portfolio.slice(0, 2).map((item) => (
                <div key={item.title} className={`relative overflow-hidden rounded-lg ${item.ratio}`}>
                  <img alt={item.alt} className="h-full w-full object-cover" src={item.src} />
                  <div className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#221019]">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 pt-6">
              {portfolio.slice(2).map((item) => (
                <div key={item.title} className={`relative overflow-hidden rounded-lg ${item.ratio}`}>
                  <img alt={item.alt} className="h-full w-full object-cover" src={item.src} />
                  <div className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#221019]">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="profile" className="mx-4 my-10 overflow-hidden rounded-xl border border-[#ee2b8c]/20 bg-[#ee2b8c]/5 p-8 relative">
          <div className="absolute right-0 top-0 p-4 opacity-10">
            <Icon>format_quote</Icon>
          </div>
          <div className="relative z-10">
            <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-[#ee2b8c]">The Philosophy</h4>
            <p className="text-xl font-medium italic leading-relaxed text-slate-700">
              "Beauty isn't about masks; it's about the precision of removal until only your truest essence remains."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ee2b8c] bg-[#ee2b8c]/20 font-bold text-[#ee2b8c]">
                CL
              </div>
              <div>
                <p className="text-sm font-bold">Clara Laurent</p>
                <p className="text-xs uppercase tracking-tighter opacity-60">Founder & Creative Lead</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-[#ee2b8c]/10 bg-white px-4 py-12">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-[#ee2b8c]/10 p-3">
              <h2 className="text-2xl font-extrabold tracking-tighter">
                CLÉ<span className="text-[#ee2b8c] underline">BEAUTY</span>
              </h2>
            </div>
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest opacity-60">
              {footerLinks.map((item) => (
                <a key={item} href="#" className="transition hover:text-[#ee2b8c]">
                  {item}
                </a>
              ))}
            </div>
            <p className="max-w-[200px] text-xs opacity-40">
              88 Pixel Plaza, Digital District.
              <br />
              By Appointment Only.
            </p>
            <div className="flex gap-2">
              <span className="h-4 w-4 bg-[#ee2b8c]/20" />
              <span className="h-4 w-4 bg-[#ee2b8c]/40" />
              <span className="h-4 w-4 bg-[#ee2b8c]/60" />
              <span className="h-4 w-4 bg-[#ee2b8c]/80" />
              <span className="h-4 w-4 bg-[#ee2b8c]" />
            </div>
            <div className="mt-4 text-[10px] uppercase opacity-30">© 2024 CLÉ BEAUTY LABS. ALL RIGHTS RESERVED.</div>
          </div>
        </footer>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#ee2b8c]/10 bg-white px-4 pb-6 pt-2">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <a className="flex flex-col items-center gap-1 text-[#ee2b8c]" href="#">
            <Icon filled>home</Icon>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-slate-400" href="#services">
            <Icon>auto_awesome</Icon>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Services</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-slate-400" href="#portfolio">
            <Icon>grid_view</Icon>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Portfolio</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-slate-400" href="#profile">
            <Icon>person</Icon>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
