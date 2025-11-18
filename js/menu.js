
function createEl(tag, options = {}) {
  const { className, text } = options;
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

const menuData = [
  {
    section: 'DRYKKIR',
    items: [
      {
        name: 'Quiz Lager',
        type: 'Léttöl',
        price: '1.200 kr.',
        description: 'Klassískur kaldur bjór, hentugur fyrir alla.',
      },
      {
        name: 'Húsvín',
        type: 'Rauðvín',
        price: '1.500 kr. glasið',
        description: 'Eðal ítalskt rauðvín.',
      },
      {
        name: 'Barsvar Spritz',
        type: 'Kokteill',
        price: '1.900 kr.',
        description:
          'Leynispritz, freyðivín og sódavatn. Alvöru skvízudrykkur.',
      },
      {
        name: 'Mocktail',
        type: 'Óáfengur kokteill',
        price: '1.300 kr.',
        description:
          'Ferskur ávaxtamix fyrir þá sem eru í chill mode en samt í leiknum.',
      },
    ],
  },
  {
    section: 'SNARL',
    items: [
      {
        name: 'Nachos Bomba',
        type: 'Snarl',
        price: '1.800 kr.',
        description: 'Tortillaflögur, ostur, salsa og guac. + geggjaður kjúlli.',
      },
      {
        name: 'Peanut Mix',
        type: 'Snarl',
        price: '650 kr.',
        description: 'Gamli skólinn elskar þennan!',
      },
      {
        name: 'Salt & Vinegar Chips',
        type: 'Snarl',
        price: '750 kr.',
        description: 'Smá súrt og salt – fyrir þá sem tapa.',
      },
      {
        name: 'Garlic Bread Bites',
        type: 'Snarl',
        price: '1.200 kr.',
        description: 'Geðveikt snarl fyrir alla. + með osti ef þú vilt.',
      },
    ],
  },
];

function renderMenu() {
  const root = document.querySelector('[data-menu-root]');
  if (!root) return;

  root.innerHTML = '';

  // header
  const header = createEl('header', { className: 'menu-header' });
  const kicker = createEl('p', {
    className: 'menu-kicker',
    text: 'BARSVAR MENU',
  });
  const heading = createEl('h1', {
    className: 'menu-heading',
    text: 'Drykkir & snarl fyrir quiz-kvöldið',
  });
  const desc = createEl('p', {
    className: 'menu-description',
    text:
      'Þú finnur ekki betri seðil í bænum á betra verði! Veldu úr úrvali af bjórum, vínum, ' +
      'kokteilum og ljúffengu snakki.',
  });

  header.append(kicker, heading, desc);

  // body
  const wrapper = createEl('div', { className: 'menu-grid-wrapper' });

  for (const section of menuData) {
    const sec = createEl('section');

    const title = createEl('h2', {
      className: 'menu-section-title',
      text: section.section,
    });

    const grid = createEl('div', { className: 'menu-grid' });

    for (const item of section.items) {
      const card = createEl('article', { className: 'menu-item' });

      const head = createEl('div', { className: 'menu-item-header' });

      const left = createEl('div');
      const name = createEl('h3', {
        className: 'menu-item-name',
        text: item.name,
      });
      const type = createEl('p', {
        className: 'menu-item-type',
        text: item.type,
      });
      left.append(name, type);

      const price = createEl('p', {
        className: 'menu-item-price',
        text: item.price,
      });

      head.append(left, price);

      const body = createEl('p', {
        className: 'menu-item-description',
        text: item.description,
      });

      card.append(head, body);
      grid.appendChild(card);
    }

    sec.append(title, grid);
    wrapper.appendChild(sec);
  }

  root.append(header, wrapper);
}

document.addEventListener('DOMContentLoaded', renderMenu);
