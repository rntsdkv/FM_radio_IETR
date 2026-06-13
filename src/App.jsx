import BoardViewer from "./components/BoardViewer.jsx";
import { meta, principle, specs, bom } from "./data.js";

const BASE = import.meta.env.BASE_URL;

function Topbar() {
  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <div className="brand">
          <span className="brand__dot" />
          <span>{meta.title}</span>
          <span className="brand__tag">{meta.klass}</span>
        </div>
        <nav className="nav">
          <a href="#principle">Принцип</a>
          <a href="#model">3D-модель</a>
          <a href="#board">Плата</a>
          <a href="#specs">Характеристики</a>
          <a href="#bom">Элементы</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <p className="hero__eyebrow">Интерактивное техническое руководство</p>
        <h1>
          FM-радиомикрофон на трёх <em>транзисторах</em>
        </h1>
        <p className="lead">{meta.subtitle}. Звук с электретного микрофона
          усиливается и модулирует ВЧ-несущую, которая излучается в эфир
          штыревой антенной.</p>
        <div className="hero__stats">
          <span className="chip"><b>3</b> транзистора 2N3904</span>
          <span className="chip"><b>64×53</b> мм плата</span>
          <span className="chip"><b>FM</b> частотная модуляция</span>
          <span className="chip"><b>33</b> компонента</span>
        </div>
      </div>
    </section>
  );
}

function Principle() {
  return (
    <section className="section" id="principle">
      <div className="wrap">
        <div className="section__head">
          <span className="section__num">01</span>
          <div>
            <h2>Как это работает</h2>
            <p className="section__sub">От звука у микрофона до радиоволны в эфире</p>
          </div>
        </div>
        <div className="principle-grid">
          {principle.map((p) => (
            <article className="pcard" key={p.n}>
              <span className="pcard__n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Model() {
  return (
    <section className="section" id="model">
      <div className="wrap">
        <div className="section__head">
          <span className="section__num">02</span>
          <div>
            <h2>3D-модель платы</h2>
            <p className="section__sub">Интерактивная модель в сборе — вращайте и приближайте</p>
          </div>
        </div>
        <BoardViewer />
      </div>
    </section>
  );
}

function Board() {
  return (
    <section className="section" id="board">
      <div className="wrap">
        <div className="section__head">
          <span className="section__num">03</span>
          <div>
            <h2>Схема и плата</h2>
            <p className="section__sub">Принципиальная схема, топология и реалистичный рендер</p>
          </div>
        </div>
        <div className="figs">
          <figure className="fig">
            <div className="fig__media">
              <img src={`${BASE}images/schematic.png`} alt="Принципиальная схема" />
            </div>
            <figcaption className="fig__cap"><b>Рис. 1.</b> Принципиальная схема (EasyEDA)</figcaption>
          </figure>
          <figure className="fig">
            <div className="fig__media">
              <img src={`${BASE}images/pcb-layout.png`} alt="Топология платы" />
            </div>
            <figcaption className="fig__cap"><b>Рис. 2.</b> Топология — двухслойная, 3 переходных отверстия</figcaption>
          </figure>
          <figure className="fig" style={{ gridColumn: "1 / -1" }}>
            <div className="fig__media">
              <img src={`${BASE}images/pcb-3d-render.png`} alt="3D-рендер платы" />
            </div>
            <figcaption className="fig__cap"><b>Рис. 3.</b> 3D-вид платы с компонентами</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function Specs() {
  return (
    <section className="section" id="specs">
      <div className="wrap">
        <div className="section__head">
          <span className="section__num">04</span>
          <div>
            <h2>Технические характеристики</h2>
          </div>
        </div>
        <div className="specs">
          {specs.map((s) => (
            <div className="spec-row" key={s.param}>
              <span>{s.param}</span>
              <span>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bom() {
  return (
    <section className="section" id="bom">
      <div className="wrap">
        <div className="section__head">
          <span className="section__num">05</span>
          <div>
            <h2>Перечень элементов</h2>
            <p className="section__sub">Полный состав по группам компонентов</p>
          </div>
        </div>
        {bom.map((g) => (
          <div className="bom-group" key={g.group}>
            <div className="bom-group__title">{g.group}</div>
            <table className="bom-table">
              <thead>
                <tr>
                  <th style={{ width: "12%" }}>Поз.</th>
                  <th style={{ width: "20%" }}>Номинал</th>
                  <th style={{ width: "34%" }}>Наименование</th>
                  <th>Примечание</th>
                </tr>
              </thead>
              <tbody>
                {g.items.map((it) => (
                  <tr key={it.ref}>
                    <td className="bom-ref">{it.ref}</td>
                    <td className="bom-nominal">{it.nominal}</td>
                    <td>{it.part}</td>
                    <td>{it.note || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__authors">{meta.authors}</div>
        <div className="footer__group">{meta.group}</div>
        <div className="footer__meta">
          {meta.klass} · {meta.title} · собрано на React + Vite + Three.js
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <Principle />
        <Model />
        <Board />
        <Specs />
        <Bom />
      </main>
      <Footer />
    </>
  );
}
