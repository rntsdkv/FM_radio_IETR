import BoardViewer from "./components/BoardViewer.jsx";
import { meta, principle, specs, bom, routing } from "./data.js";

const BASE = import.meta.env.BASE_URL;

function Topbar() {
  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <div className="brand">
          <span>{meta.title}</span>
        </div>
        <nav className="nav">
          <a href="#principle">Принцип</a>
          <a href="#model">3D-модель</a>
          <a href="#board">Плата</a>
          <a href="#specs">Характеристики</a>
          <a href="#bom">Элементы</a>
          <a href="#routing">Тех. карта</a>
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
          FM-передатчик на трёх <em>транзисторах</em>
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

function Routing() {
  return (
    <section className="section" id="routing">
      <div className="wrap">
        <div className="section__head">
          <span className="section__num">06</span>
          <div>
            <h2>Технологическая карта</h2>
            <p className="section__sub">Сборка и монтаж печатного узла — маршрут операций</p>
          </div>
        </div>

        <div className="routing-doc">
          <div className="routing-doc__head">
            <div className="routing-doc__meta">
              <div>
                <span className="routing-doc__label">Организация</span>
                <span className="routing-doc__value">{routing.header.org}</span>
              </div>
              <div>
                <span className="routing-doc__label">Кафедра</span>
                <span className="routing-doc__value">{routing.header.dept}</span>
              </div>
              <div>
                <span className="routing-doc__label">Изделие</span>
                <span className="routing-doc__value">{routing.header.product}</span>
              </div>
              <div>
                <span className="routing-doc__label">Обозначение</span>
                <span className="routing-doc__value routing-doc__value--mono">{routing.header.designation}</span>
              </div>
            </div>

            <div className="routing-doc__badges">
              {routing.badges.map((b) => (
                <span className="chip" key={b}>{b}</span>
              ))}
            </div>
          </div>

          <ol className="routing-ops">
            {routing.operations.map((op) => (
              <li className={`routing-op routing-op--${op.shop === "ОТК" ? "qc" : "shop"}`} key={op.n}>
                <div className="routing-op__side">
                  <span className="routing-op__shop">{op.shop === "ОТК" ? "ОТК" : `Цех ${op.shop}`}</span>
                  <span className="routing-op__num">№ {op.n}</span>
                </div>
                <div className="routing-op__body">
                  <div className="routing-op__title">
                    <h3>{op.title}</h3>
                    {op.iot && <span className="routing-op__iot">{op.iot}</span>}
                  </div>
                  <p className="routing-op__text">{op.content}</p>
                  {op.tool && (
                    <p className="routing-op__tool">
                      <span>Инструмент:</span> {op.tool}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
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
          {meta.title}
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
        <Routing />
      </main>
      <Footer />
    </>
  );
}
