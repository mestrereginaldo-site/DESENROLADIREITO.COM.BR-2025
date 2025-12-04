// Dados dos artigos (10 artigos atualizados para dezembro 2025)
const artigos = [
    {
        id: 1,
        titulo: "Regulamentação da IA no Direito Brasileiro: Lei 14.874/2025",
        categoria: "digital",
        categoriaTexto: "Direito Digital",
        resumo: "Análise completa da nova legislação sobre Inteligência Artificial no ordenamento jurídico brasileiro e seus impactos nos contratos, responsabilidade civil e proteção de dados.",
        data: "05/12/2025",
        leitura: "8 min",
        icon: "fas fa-robot"
    },
    {
        id: 2,
        titulo: "Reforma Tributária 2025: Novas Alíquotas e Impactos",
        categoria: "tributario",
        categoriaTexto: "Direito Tributário",
        resumo: "Como a reforma tributária aprovada em 2025 afeta empresas e contribuintes individuais. Análise comparativa com o sistema anterior e orientações práticas.",
        data: "10/12/2025",
        leitura: "12 min",
        icon: "fas fa-chart-pie"
    },
    {
        id: 3,
        titulo: "Direitos do Consumidor nas Compras de Final de Ano",
        categoria: "consumidor",
        categoriaTexto: "Direito do Consumidor",
        resumo: "Guia completo sobre os direitos nas compras de Natal e ano novo, prazos para devolução, garantias especiais e como proceder em caso de problemas.",
        data: "15/12/2025",
        leitura: "6 min",
        icon: "fas fa-shopping-cart"
    },
    {
        id: 4,
        titulo: "Novas Regras para Home Office Pós-Reforma Trabalhista 2025",
        categoria: "trabalho",
        categoriaTexto: "Direito Trabalhista",
        resumo: "As alterações na legislação trabalhista sobre teletrabalho, direitos e obrigações do empregador e empregado, e como formalizar o acordo de home office.",
        data: "03/12/2025",
        leitura: "10 min",
        icon: "fas fa-laptop-house"
    },
    {
        id: 5,
        titulo: "Alterações no Código de Processo Civil para 2026",
        categoria: "civil",
        categoriaTexto: "Direito Civil",
        resumo: "Principais mudanças no CPC que entrarão em vigor em 2026, com análise dos impactos na tramitação processual e prazos processuais.",
        data: "18/12/2025",
        leitura: "15 min",
        icon: "fas fa-gavel"
    },
    {
        id: 6,
        titulo: "LGPD 2025: Novas Interpretações e Jurisprudência",
        categoria: "digital",
        categoriaTexto: "Direito Digital",
        resumo: "Análise das principais decisões judiciais e entendimentos da Autoridade Nacional de Proteção de Dados sobre a Lei Geral de Proteção de Dados.",
        data: "12/12/2025",
        leitura: "9 min",
        icon: "fas fa-database"
    },
    {
        id: 7,
        titulo: "Imposto de Renda 2026: O que mudou para pessoas jurídicas",
        categoria: "tributario",
        categoriaTexto: "Direito Tributário",
        resumo: "As alterações na declaração do Imposto de Renda para empresas em 2026, com orientações práticas para evitar multas e autuações.",
        data: "20/12/2025",
        leitura: "11 min",
        icon: "fas fa-file-invoice-dollar"
    },
    {
        id: 8,
        titulo: "Contratos Inteligentes e Blockchain no Direito Brasileiro",
        categoria: "digital",
        categoriaTexto: "Direito Digital",
        resumo: "A validade jurídica dos contratos inteligentes e o uso de blockchain no direito contratual, com análise de casos práticos.",
        data: "08/12/2025",
        leitura: "7 min",
        icon: "fas fa-code"
    },
    {
        id: 9,
        titulo: "Aspectos Jurídicos da Economia de Compartilhamento",
        categoria: "civil",
        categoriaTexto: "Direito Civil",
        resumo: "Responsabilidade civil nas plataformas de compartilhamento (Uber, Airbnb, etc.) e os direitos dos consumidores e prestadores de serviço.",
        data: "25/12/2025",
        leitura: "8 min",
        icon: "fas fa-share-alt"
    },
    {
        id: 10,
        titulo: "Assédio Moral no Ambiente de Trabalho Remoto",
        categoria: "trabalho",
        categoriaTexto: "Direito Trabalhista",
        resumo: "Como identificar e comprovar assédio moral em ambiente de trabalho remoto, jurisprudência recente e medidas preventivas para empresas.",
        data: "22/12/2025",
        leitura: "9 min",
        icon: "fas fa-user-shield"
    }
];

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Carregar artigos na página
    carregarArtigos();
    
    // Configurar filtros de artigos
    configurarFiltros();
    
    // Configurar menu mobile
    configurarMenuMobile();
    
    // Configurar busca
    configurarBusca();
    
    // Configurar newsletter
    configurarNewsletter();
    
    // Configurar botão "Carregar Mais"
    configurarCarregarMais();
});

// Função para carregar artigos na grid
function carregarArtigos(filtro = 'all', limite = 6) {
    const artigosGrid = document.getElementById('artigosGrid');
    
    if (!artigosGrid) return;
    
    // Filtrar artigos
    let artigosFiltrados;
    if (filtro === 'all') {
        artigosFiltrados = artigos;
    } else {
        artigosFiltrados = artigos.filter(artigo => artigo.categoria === filtro);
    }
    
    // Limitar quantidade
    const artigosParaMostrar = artigosFiltrados.slice(0, limite);
    
    // Limpar grid
    artigosGrid.innerHTML = '';
    
    // Adicionar artigos ao grid
    artigosParaMostrar.forEach(artigo => {
        const artigoCard = criarArtigoCard(artigo);
        artigosGrid.appendChild(artigoCard);
    });
    
    // Atualizar contador
    const contadorElement = document.getElementById('artigosContador');
    if (contadorElement) {
        contadorElement.textContent = `${artigosFiltrados.length} artigos encontrados`;
    }
    
    // Mostrar/ocultar botão "Carregar Mais"
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (artigosFiltrados.length > limite) {
            loadMoreBtn.style.display = 'inline-block';
            loadMoreBtn.dataset.filtro = filtro;
            loadMoreBtn.dataset.limite = limite;
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

// Função para criar card de artigo
function criarArtigoCard(artigo) {
    const card = document.createElement('article');
    card.className = 'artigo-card';
    card.dataset.categoria = artigo.categoria;
    
    // Cores por categoria
    const coresCategorias = {
        'digital': '#4a6fa5',
        'tributario': '#d17a22',
        'consumidor': '#2a9d8f',
        'trabalho': '#e76f51',
        'civil': '#9d4edd'
    };
    
    const corCategoria = coresCategorias[artigo.categoria] || '#1a3a5f';
    
    card.innerHTML = `
        <div class="artigo-img" style="background-color: ${corCategoria}20; color: ${corCategoria};">
            <i class="${artigo.icon}"></i>
        </div>
        <div class="artigo-content">
            <span class="artigo-category" style="background-color: ${corCategoria}20; color: ${corCategoria};">${artigo.categoriaTexto}</span>
            <h3 class="artigo-title">${artigo.titulo}</h3>
            <p class="artigo-excerpt">${artigo.resumo}</p>
            <div class="artigo-meta">
                <span><i class="far fa-calendar"></i> ${artigo.data}</span>
                <span><i class="far fa-clock"></i> ${artigo.leitura} de leitura</span>
            </div>
        </div>
    `;
    
    return card;
}

// Função para configurar filtros
function configurarFiltros() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Obter filtro
            const filtro = this.dataset.filter;
            
            // Carregar artigos com filtro
            carregarArtigos(filtro, 6);
        });
    });
}

// Função para configurar menu mobile
function configurarMenuMobile() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Alterar ícone
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
}

// Função para configurar busca
function configurarBusca() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', realizarBusca);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                realizarBusca();
            }
        });
    }
}

// Função para realizar busca
function realizarBusca() {
    const searchInput = document.getElementById('searchInput');
    const termo = searchInput.value.trim().toLowerCase();
    
    if (termo === '') {
        alert('Por favor, digite um termo para buscar.');
        searchInput.focus();
        return;
    }
    
    // Filtrar artigos pelo termo de busca
    const resultados = artigos.filter(artigo => 
        artigo.titulo.toLowerCase().includes(termo) || 
        artigo.resumo.toLowerCase().includes(termo) ||
        artigo.categoriaTexto.toLowerCase().includes(termo)
    );
    
    // Atualizar a grid com resultados
    const artigosGrid = document.getElementById('artigosGrid');
    if (!artigosGrid) return;
    
    // Limpar grid
    artigosGrid.innerHTML = '';
    
    if (resultados.length === 0) {
        artigosGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #6c757d; margin-bottom: 20px;"></i>
                <h3>Nenhum artigo encontrado</h3>
                <p>Não encontramos artigos correspondentes à sua busca por "${termo}".</p>
            </div>
        `;
    } else {
        resultados.forEach(artigo => {
            const artigoCard = criarArtigoCard(artigo);
            artigosGrid.appendChild(artigoCard);
        });
    }
    
    // Atualizar título da seção
    const sectionTitle = document.querySelector('.artigos .section-title');
    const originalTitle = sectionTitle.dataset.originalTitle || 'Artigos Jurídicos Atualizados';
    
    if (!sectionTitle.dataset.originalTitle) {
        sectionTitle.dataset.originalTitle = sectionTitle.textContent;
    }
    
    if (resultados.length > 0) {
        sectionTitle.textContent = `${resultados.length} resultado(s) para "${termo}"`;
    }
    
    // Ocultar filtros
    const filterContainer = document.querySelector('.artigos-filter');
    if (filterContainer) {
        filterContainer.style.display = 'none';
    }
    
    // Mostrar botão "Limpar busca"
    const loadMoreContainer = document.querySelector('.load-more-container');
    if (loadMoreContainer) {
        loadMoreContainer.innerHTML = `
            <button id="clearSearchBtn" class="btn btn-outline">Limpar busca e ver todos os artigos</button>
        `;
        
        document.getElementById('clearSearchBtn').addEventListener('click', function() {
            // Restaurar estado original
            searchInput.value = '';
            sectionTitle.textContent = originalTitle;
            
            if (filterContainer) {
                filterContainer.style.display = 'flex';
            }
            
            carregarArtigos('all', 6);
        });
    }
}

// Função para configurar newsletter
function configurarNewsletter() {
    const newsletterBtn = document.getElementById('newsletterBtn');
    const newsletterEmail = document.getElementById('newsletterEmail');
    
    if (newsletterBtn && newsletterEmail) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterEmail.value.trim();
            
            if (!validarEmail(email)) {
                alert('Por favor, insira um e-mail válido.');
                newsletterEmail.focus();
                return;
            }
            
            // Simular envio
            newsletterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            newsletterBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Obrigado por assinar nossa newsletter! Um e-mail de confirmação foi enviado para ${email}.`);
                newsletterEmail.value = '';
                newsletterBtn.innerHTML = 'Assinar';
                newsletterBtn.disabled = false;
            }, 1500);
        });
    }
}

// Função para validar e-mail
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para configurar botão "Carregar Mais"
function configurarCarregarMais() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const filtro = this.dataset.filtro || 'all';
            const limiteAtual = parseInt(this.dataset.limite) || 6;
            const novoLimite = limiteAtual + 3;
            
            // Carregar mais artigos
            carregarArtigos(filtro, novoLimite);
        });
    }
}

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Adicionar ano atual no footer
const anoAtual = new Date().getFullYear();
const anoFooter = document.querySelector('.footer-bottom p');
if (anoFooter && anoFooter.textContent.includes('2025')) {
    anoFooter.innerHTML = anoFooter.innerHTML.replace('2025', anoAtual);
}
