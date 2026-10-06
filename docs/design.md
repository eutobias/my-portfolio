# Tobias Taurian — Neo Brutalism Portfolio
## Design System & Specifications Guide

---

## 📋 Visão Geral do Projeto

**Nome:** Tobias Taurian Portfolio  
**Estilo:** Neo Brutalism  
**Tema Padrão:** Light Mint  
**Temas Adicionais:** Pastel Dream, Bold Contrast, Sunset Vibes  
**Tipografia:** Space Grotesk (Display) + JetBrains Mono (Monospace)  
**Plataforma:** Web Responsiva (Mobile, Tablet, Desktop)

---

## 🎨 Paleta de Cores

### Tema 1: Light Mint (Padrão)
| Elemento | Cor | Hex | Uso |
|----------|-----|-----|-----|
| Background | Branco | #FFFFFF | Fundo principal |
| Background Secundário | Cinza Claro | #F5F5F5 | Cards, seções |
| Texto Principal | Preto | #000000 | Títulos, corpo |
| Texto Secundário | Cinza Médio | #4B5563 | Descrições |
| Bordas | Preto | #000000 | Bordas de 4px |
| Primária | Neon Mint | #00D084 | CTAs, destaques |
| Secundária | Lavanda | #D8B4FE | Botões, badges |
| Destaque | Orange | #FF7E40 | Ênfase, hover |
| Realce | Yellow | #FDE047 | Avisos, informações |

### Tema 2: Pastel Dream
| Elemento | Cor | Hex | Uso |
|----------|-----|-----|-----|
| Background | Soft Cream | #FFF9F5 | Fundo principal |
| Background Secundário | Lavanda Claro | #F5E6F0 | Cards |
| Texto Principal | Deep Purple | #2D1B4E | Títulos |
| Texto Secundário | Purple Médio | #6B5B7F | Descrições |
| Bordas | Deep Purple | #2D1B4E | Bordas |
| Primária | Soft Pink | #FFB3D9 | CTAs |
| Secundária | Soft Blue | #B3E5FC | Botões |
| Destaque | Soft Orange | #FFD699 | Ênfase |
| Realce | Soft Green | #C8E6C9 | Informações |

### Tema 3: Bold Contrast
| Elemento | Cor | Hex | Uso |
|----------|-----|-----|-----|
| Background | Off-White | #FFFBF0 | Fundo principal |
| Background Secundário | Cinza Claro | #F0F0F0 | Cards |
| Texto Principal | Preto | #000000 | Títulos |
| Texto Secundário | Cinza Escuro | #333333 | Descrições |
| Bordas | Preto | #000000 | Bordas |
| Primária | Hot Pink | #FF006E | CTAs (texto branco) |
| Secundária | Cyan | #00D9FF | Botões |
| Destaque | Bright Yellow | #FFD60A | Ênfase |
| Realce | Bright Blue | #3A86FF | Informações (texto branco) |

### Tema 4: Sunset Vibes
| Elemento | Cor | Hex | Uso |
|----------|-----|-----|-----|
| Background | Warm Cream | #FFF5E6 | Fundo principal |
| Background Secundário | Peach | #FFE8D6 | Cards |
| Texto Principal | Dark Brown | #3D2817 | Títulos |
| Texto Secundário | Brown Médio | #6B5344 | Descrições |
| Bordas | Dark Brown | #3D2817 | Bordas |
| Primária | Warm Orange | #FF6B35 | CTAs (texto branco) |
| Secundária | Golden Orange | #F7931E | Botões (texto branco) |
| Destaque | Deep Orange | #FB5607 | Ênfase (texto branco) |
| Realce | Golden Yellow | #FFBE0B | Informações |

---

## 🔤 Sistema de Tipografia

### Fontes
- **Display/Headings:** Space Grotesk (Bold 700, Extra Bold 800)
- **Body/Texto:** Space Grotesk (Medium 500, Semi-Bold 600)
- **Monospace:** JetBrains Mono (Regular 400, Bold 700)

### Hierarquia Tipográfica

| Nível | Tamanho | Peso | Line Height | Letter Spacing | Uso |
|-------|---------|------|-------------|----------------|-----|
| XL | 48px | 800 | 1.2 | -0.02em | Hero titles |
| Large | 36px | 800 | 1.3 | -0.01em | Section titles |
| Medium | 28px | 700 | 1.3 | 0em | Subsection titles |
| Small | 20px | 700 | 1.4 | 0em | Card titles |
| Body Large | 18px | 500 | 1.6 | 0em | Descrições principais |
| Body Medium | 16px | 500 | 1.6 | 0em | Texto padrão |
| Body Small | 14px | 500 | 1.5 | 0em | Texto secundário |
| Mono Large | 14px | 500 | 1.6 | 0em | Código, badges |
| Mono Medium | 12px | 500 | 1.5 | 0em | Labels |
| Mono Small | 10px | 500 | 1.4 | 0em | Timestamps |

---

## 📐 Sistema de Espaçamento

| Token | Valor | Uso |
|-------|-------|-----|
| xs | 4px | Micro spacing |
| sm | 8px | Small gaps |
| md | 16px | Padding padrão |
| lg | 24px | Section padding |
| xl | 32px | Large spacing |
| 2xl | 48px | Extra large |
| 3xl | 64px | Hero spacing |

---

## 🎭 Sombras & Efeitos

### Sombras Offset (Neo Brutalism)
Todas as sombras são **sólidas, sem blur**, com offset direto:

| Tamanho | Offset | Cor | Uso |
|---------|--------|-----|-----|
| Small | 2px | rgba(0,0,0,0.2) | Elementos pequenos |
| Medium | 4px | rgba(0,0,0,0.2) | Cards, botões |
| Large | 6px | rgba(0,0,0,0.2) | Seções grandes |
| Extra Large | 8px | rgba(0,0,0,0.2) | Hero sections |

### Transições
- **Hover:** 200ms ease-out
- **Active:** 100ms ease-out
- **Tema:** 300ms fade

---

## 🖼️ Bordas & Raios

- **Border Width Padrão:** 4px (sólido, preto)
- **Border Width Secundário:** 3px
- **Border Width Terciário:** 2px
- **Border Radius:** 0px (sem arredondamento - sharp corners)

---

## 🧩 Componentes Principais

### Botões

#### Botão Primário
- **Background:** Cor Primária
- **Texto:** Cor de texto primária
- **Border:** 4px sólido (cor border)
- **Padding:** 16px 24px
- **Shadow:** 6px 6px 0px
- **Hover:** Translate -2px -2px, shadow 4px 4px
- **Active:** Translate -6px -6px, shadow none

#### Botão Secundário
- **Background:** Cor Secundária
- **Texto:** Cor de texto secundária
- **Border:** 4px sólido
- **Padding:** 16px 24px
- **Shadow:** 6px 6px 0px
- **Hover:** Translate -2px -2px

#### Botão Pequeno
- **Padding:** 8px 12px
- **Border:** 2px sólido
- **Shadow:** 2px 2px 0px

### Cards

- **Background:** Background Secundário
- **Border:** 4px sólido
- **Padding:** 24px
- **Shadow:** 6px 6px 0px
- **Hover:** Translate -2px -2px, shadow 8px 8px

### Inputs

- **Background:** Background Principal
- **Border:** 4px sólido
- **Padding:** 12px
- **Focus:** Ring 4px (cor primária)
- **Placeholder:** Opacity 50%

### Badges

- **Padding:** 8px 12px
- **Border:** 2px sólido
- **Font:** Monospace Small
- **Shadow:** 2px 2px 0px

---

## 📱 Breakpoints Responsivos

| Breakpoint | Largura | Uso |
|------------|---------|-----|
| Mobile | 320px - 640px | Smartphones |
| Tablet | 641px - 1024px | Tablets |
| Desktop | 1025px+ | Desktops |

### Ajustes por Breakpoint
- **Mobile:** Padding 16px, font reduzida 10-20%
- **Tablet:** Padding 24px, layout 2 colunas
- **Desktop:** Padding 32px, layout 3+ colunas

---

## 🎬 Animações & Micro-interações

### Transições Padrão
```css
/* Hover de botão */
transition: transform 200ms ease-out, box-shadow 200ms ease-out;

/* Hover de card */
transition: transform 300ms ease-out, box-shadow 300ms ease-out;

/* Mudança de tema */
transition: background-color 300ms ease-out, color 300ms ease-out;
```

### Easing
- **ease-out:** cubic-bezier(0.23, 1, 0.32, 1) - Snappy
- **ease-in-out:** cubic-bezier(0.77, 0, 0.175, 1) - Smooth

### Transformações
- **Hover:** translate(-2px, -2px)
- **Active:** translate(-6px, -6px)
- **Scale:** Não usar (manter 1x)

---

## 📄 Estrutura de Páginas

### Home
- **Hero Section:** Título grande (48px), descrição, 2 CTAs
- **Avatar Box:** Terminal-style com SVG avatar
- **Core Pillars:** 3 cards com ícones
- **Featured Projects:** 3 cards de projetos

### Projects
- **Grid:** 2 colunas (desktop), 1 coluna (mobile)
- **Card:** Imagem 16:9, título, descrição, badges de tech
- **Total:** 8 projetos

### About
- **Bio Section:** Resumo profissional + stats box
- **Skills Grid:** 5 categorias de habilidades
- **Timeline:** Experiências profissionais com dots

### Contact
- **Formulário:** Nome, Email, Telefone, Mensagem
- **Info Boxes:** Email, Telefone, WhatsApp
- **Success State:** Animação de sucesso com checkmark

---

## 🎯 Seletor de Temas

### Localização
- **Posição:** Fixed, bottom-right
- **Offset:** 24px from bottom, 24px from right
- **Z-index:** 50

### Comportamento
- **Padrão:** Light Mint
- **Persistência:** localStorage
- **Transição:** 300ms fade
- **Opções:** 4 temas com nomes e cores

---

## 📊 Design Tokens (Figma)

Todos os tokens estão disponíveis em formato JSON para importação via **Figma Tokens Plugin**:

```json
{
  "colors": { ... },
  "typography": { ... },
  "spacing": { ... },
  "shadows": { ... },
  "borders": { ... }
}
```

---

## ✨ Princípios de Design

1. **Contraste Alto:** Bordas pretas grossas, cores vibrantes
2. **Sharp Corners:** Sem border-radius (0px sempre)
3. **Offset Shadows:** Sombras sólidas, sem blur
4. **Bold Typography:** Weights altos (700-800)
5. **Functional Spacing:** Espaçamento generoso
6. **Responsive First:** Mobile-first approach
7. **Tema Dinâmico:** 4 variações de tema completas
8. **Acessibilidade:** Contraste WCAA AA+, focus rings

---

## 🔗 Recursos

- **Repositório:** GitHub - eutobias.dev
- **Deploy:** Manus (manus.space)
- **Domínio:** eutobias.dev
- **Contato:** me@eutobias.dev

---

**Versão:** 1.0.0  
**Data:** Junho 2026  
**Autor:** Tobias Taurian  
**Atualizado:** 02/06/2026
