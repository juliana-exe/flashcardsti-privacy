// ─────────────────────────────────────────────────────────────────────────────
//  data/redes.js — Redes de Computadores (100 cards)
// ─────────────────────────────────────────────────────────────────────────────

export default [
  { id:'redes_001', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Protocolo TCP',
    verso:'Transmission Control Protocol — Camada de Transporte (OSI L4). Orientado à conexão via three-way handshake (SYN → SYN-ACK → ACK). Garante entrega confiável, ordenada e com controle de fluxo e congestionamento. Contraponto: UDP (sem conexão, menor latência).' },

  { id:'redes_002', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Protocolo DNS',
    verso:'Domain Name System — resolve nomes de domínio em endereços IP. Porta 53 (UDP para consultas; TCP para respostas >512 bytes e transferência de zona). Hierarquia: Root Servers → TLD (.com, .br) → Servidor autoritativo → Resolver recursivo.' },

  { id:'redes_003', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Modelo OSI — 7 Camadas',
    verso:'De baixo para cima:\n1. Física — bits no meio físico\n2. Enlace — quadros, endereço MAC\n3. Rede — pacotes, endereço IP\n4. Transporte — TCP/UDP, segmentos\n5. Sessão — controle de diálogo\n6. Apresentação — codificação, criptografia\n7. Aplicação — HTTP, FTP, SMTP' },

  { id:'redes_004', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'VLAN (Virtual LAN)',
    verso:'Segmentação lógica de uma rede física em domínios de broadcast independentes no switch. Configurada por porta (modo access) ou por tag IEEE 802.1Q (modo trunk). Aumenta segurança, reduz broadcasts desnecessários e facilita o gerenciamento.' },

  { id:'redes_005', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'IPv6 — Principais Características',
    verso:'Endereços de 128 bits (vs 32 bits do IPv4), notação hexadecimal separada por ":". Sem broadcast (usa multicast e anycast). Cabeçalho simplificado. IPSec nativo previsto na especificação original, mas opcional na prática (RFC 6434 removeu a obrigatoriedade). Auto-configuração stateless via SLAAC. Espaço de ~3,4×10³⁸ endereços.' },

  { id:'redes_006', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Protocolo UDP',
    verso:'User Datagram Protocol — Camada de Transporte (OSI L4), sem conexão prévia e sem garantia de entrega. Cabeçalho reduzido (8 bytes). Usado onde latência importa mais que confiabilidade: streaming de vídeo/áudio, DNS, DHCP, jogos online e VoIP.' },

  { id:'redes_007', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo DHCP',
    verso:'Dynamic Host Configuration Protocol — atribui automaticamente IP, máscara, gateway e DNS a hosts. Usa portas UDP 67 (servidor) e 68 (cliente). Fluxo DORA: Discover → Offer → Request → Acknowledge. Facilita administração evitando configuração manual.' },

  { id:'redes_008', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'NAT — Network Address Translation',
    verso:'Traduz endereços IP privados (RFC 1918: 10.x, 172.16-31.x, 192.168.x) em endereço público, permitindo que múltiplos hosts compartilhem um único IP externo. PAT/NAPT usa portas para distinguir conexões. Efeito colateral: dificulta conexões de entrada (precisa de port forwarding).' },

  { id:'redes_009', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'Protocolo OSPF',
    verso:'Open Shortest Path First — protocolo de roteamento de estado de enlace (Link State), padrão aberto (RFC 2328). Usa algoritmo de Dijkstra (SPF) para calcular menor caminho. Suporta VLSM e CIDR. Divide a rede em áreas; área 0 é o backbone obrigatório. Métrica: custo baseado na largura de banda.' },

  { id:'redes_010', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'Protocolo BGP',
    verso:'Border Gateway Protocol — protocolo de roteamento entre sistemas autônomos (EGP). Baseia decisões em políticas e atributos de caminho (AS-PATH, NEXT-HOP, LOCAL-PREF, MED). Usa TCP porta 179. É o protocolo que sustenta o roteamento na Internet global. Versão atual: BGP-4.' },

  { id:'redes_011', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Modelo TCP/IP — 4 Camadas',
    verso:'1. Acesso à rede (Enlace + Física do OSI) — Ethernet, Wi-Fi\n2. Internet (Rede) — IP, ICMP, ARP\n3. Transporte — TCP, UDP\n4. Aplicação (Sessão + Apresentação + Aplicação do OSI) — HTTP, FTP, DNS, SMTP' },

  { id:'redes_012', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Protocolo HTTP vs HTTPS',
    verso:'HTTP (porta 80) transmite dados em texto claro, sem criptografia. HTTPS (porta 443) encapsula o HTTP dentro de TLS/SSL, garantindo confidencialidade, integridade e autenticação do servidor via certificado digital. HTTPS é obrigatório para sites com dados sensíveis.' },

  { id:'redes_013', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo FTP',
    verso:'File Transfer Protocol — transferência de arquivos usando dois canais: controle (porta 21, comandos) e dados (porta 20 no modo ativo; porta dinâmica no modo passivo). Transmite dados sem criptografia. Alternativas seguras: SFTP (sobre SSH) e FTPS (sobre TLS).' },

  { id:'redes_014', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Protocolo SMTP / POP3 / IMAP',
    verso:'SMTP (porta 25/587): envio de e-mails entre servidores ou do cliente ao servidor.\nPOP3 (porta 110): download de e-mails para o cliente; apaga do servidor por padrão.\nIMAP (porta 143): acesso e gerenciamento de e-mails no servidor; sincroniza múltiplos dispositivos.' },

  { id:'redes_015', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Sub-redes — VLSM e CIDR',
    verso:'VLSM (Variable Length Subnet Masking) permite máscaras de tamanhos diferentes em sub-redes de um mesmo bloco, otimizando uso de IPs. CIDR (Classless Inter-Domain Routing) usa notação prefixo/comprimento (ex.: 192.168.1.0/24) eliminando classes fixas A/B/C. Ambos são essenciais para concursos.' },

  { id:'redes_016', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'STP — Spanning Tree Protocol',
    verso:'IEEE 802.1D — elimina loops em redes com switches redundantes bloqueando portas. Elege uma Root Bridge (menor Bridge ID = prioridade+MAC). Variações: RSTP (802.1w, convergência rápida ~1s) e MSTP (802.1s, múltiplas instâncias por VLAN). Loop provoca broadcast storm sem STP.' },

  { id:'redes_017', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo ARP',
    verso:'Address Resolution Protocol — resolve endereços IP em endereços MAC na mesma rede local. Opera na camada de Enlace. O host envia broadcast "quem tem IP X?" e o dono responde com seu MAC. Resultado armazenado na tabela ARP (cache). ARP Gratuito anuncia o próprio IP para detectar conflitos.' },

  { id:'redes_018', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo ICMP',
    verso:'Internet Control Message Protocol — protocolo auxiliar do IP para mensagens de erro e controle (não transporta dados de aplicação). Exemplos: Echo Request/Reply (ping), Destination Unreachable, Time Exceeded (TTL=0, usado pelo traceroute). Opera na camada de rede (L3).' },

  { id:'redes_019', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'QoS — Qualidade de Serviço',
    verso:'Mecanismos para priorizar tráfego crítico (VoIP, videoconferência) em redes congestionadas. Técnicas: classificação e marcação (DSCP, CoS), filas (WFQ, PQ), policiamento e modelagem (traffic shaping/policing), compressão de cabeçalho. Parâmetros-chave: latência, jitter, perda de pacotes e largura de banda.' },

  { id:'redes_020', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Wi-Fi — Padrões IEEE 802.11',
    verso:'• 802.11b: 2,4 GHz, 11 Mbps\n• 802.11g: 2,4 GHz, 54 Mbps\n• 802.11n (Wi-Fi 4): 2,4/5 GHz, até 600 Mbps, MIMO\n• 802.11ac (Wi-Fi 5): 5 GHz, até 6,9 Gbps, MU-MIMO\n• 802.11ax (Wi-Fi 6): 2,4/5/6 GHz, até 9,6 Gbps, OFDMA' },

  { id:'redes_021', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Endereços IP Privados (RFC 1918)',
    verso:'Faixas reservadas para uso em redes internas, não roteáveis na Internet:\n• Classe A: 10.0.0.0/8\n• Classe B: 172.16.0.0/12 (172.16.0.0 – 172.31.255.255)\n• Classe C: 192.168.0.0/16\nOutros especiais: 127.0.0.0/8 (loopback), 169.254.0.0/16 (APIPA).' },

  { id:'redes_022', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'VPN — Virtual Private Network',
    verso:'Cria túnel criptografado sobre rede pública (Internet), garantindo confidencialidade e integridade. Protocolos comuns: IPSec (L3, mais usado em redes corporativas), SSL/TLS (L4-7, baseado em web, ex.: OpenVPN), L2TP (geralmente combinado com IPSec). Modos: túnel (host-to-site) e transporte (site-to-site).' },

  { id:'redes_023', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'IPSec — Modos e Protocolos',
    verso:'Dois protocolos:\n• AH (Authentication Header): autenticação e integridade, sem criptografia.\n• ESP (Encapsulating Security Payload): autenticação, integridade E criptografia.\n\nDois modos:\n• Transporte: protege apenas o payload (host a host).\n• Túnel: encapsula o pacote IP inteiro (gateway a gateway, usado em VPNs).' },

  { id:'redes_024', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'DNS — Tipos de Registros',
    verso:'• A: nome → IPv4\n• AAAA: nome → IPv6\n• MX: servidor de e-mail do domínio\n• CNAME: alias para outro nome\n• NS: servidor DNS autoritativo do domínio\n• PTR: IPv4 → nome (DNS reverso)\n• TXT: texto livre (SPF, DKIM, verificação de domínio)\n• SOA: informações de autoridade da zona' },

  { id:'redes_025', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Topologias de Rede',
    verso:'• Barramento: todos no mesmo meio; colisões frequentes.\n• Estrela: hub/switch central; falha central derruba tudo.\n• Anel: dados circulam em loop; token ring.\n• Malha (mesh): múltiplos caminhos; alta redundância; cara.\n• Árvore: hierárquica, combinação de estrela e barramento.\n• Ponto a ponto: dois nós apenas.' },

  { id:'redes_026', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Hub vs Switch vs Roteador',
    verso:'• Hub (L1): replica frames para todas as portas; domínio de colisão único.\n• Switch (L2): encaminha frames pelo MAC; isola domínios de colisão por porta.\n• Roteador (L3): encaminha pacotes por IP entre redes distintas; separa domínios de broadcast.' },

  { id:'redes_027', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'SNMP — Simple Network Management Protocol',
    verso:'Protocolo de gerenciamento de rede (L7), porta UDP 161 (agente) e 162 (trap). Componentes: gerente (NMS), agente (no dispositivo), MIB (base de dados de objetos gerenciados). Versões: SNMPv1/v2c (sem criptografia), SNMPv3 (autenticação e privacidade). Frequente em questões Cebraspe.' },

  { id:'redes_028', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'MPLS — Multiprotocol Label Switching',
    verso:'Substitui roteamento IP por comutação de rótulos (labels), tornando o encaminhamento mais rápido. Labels são inseridos entre o cabeçalho L2 e L3. LSR (Label Switching Router) comuta por label; LER de entrada atribui label; LER de saída remove. Muito usado em WAN de operadoras para QoS e VPNs corporativas.' },

  { id:'redes_029', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo RIP',
    verso:'Routing Information Protocol — protocolo de roteamento por vetor de distância. Métrica: número de saltos (hops), máximo 15 (16 = infinito/inalcançável). Atualização periódica a cada 30s. RIPv1: classful; RIPv2: suporta VLSM e autenticação. Convergência lenta; indicado apenas para redes pequenas.' },

  { id:'redes_030', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Ethernet — Padrões e Velocidades',
    verso:'• 10BASE-T: 10 Mbps, par trançado\n• 100BASE-TX (Fast Ethernet): 100 Mbps\n• 1000BASE-T (Gigabit): 1 Gbps, cat5e/6\n• 10GBASE-T: 10 Gbps, cat6a/7\nQuadro Ethernet: preâmbulo, MAC destino (6B), MAC origem (6B), EtherType/Length, dados (46-1500B), FCS (4B). MTU padrão: 1500 bytes.' },

  { id:'redes_031', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'SDN — Software Defined Networking',
    verso:'Separa o plano de controle (decisão de encaminhamento, centralizado no controlador SDN) do plano de dados (encaminhamento físico nos switches). Controlador programa os dispositivos via APIs abertas (OpenFlow). Benefícios: flexibilidade, automação, gerência centralizada. Base para redes em nuvem e NFV.' },

  { id:'redes_032', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Máscara de Sub-rede /24 /25 /26',
    verso:'/24 = 255.255.255.0 → 256 IPs (254 hosts)\n/25 = 255.255.255.128 → 128 IPs (126 hosts)\n/26 = 255.255.255.192 → 64 IPs (62 hosts)\n/27 = 255.255.255.224 → 32 IPs (30 hosts)\n/28 = 255.255.255.240 → 16 IPs (14 hosts)\nFórmula: hosts = 2^(32-prefixo) – 2.' },

  { id:'redes_033', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo HTTPS — TLS Handshake',
    verso:'1. Client Hello (versão TLS, cipher suites, random)\n2. Server Hello + certificado\n3. Cliente valida certificado (CA, validade, CN)\n4. Troca de chave (Key Exchange — RSA ou ECDHE)\n5. Change Cipher Spec (ativa criptografia simétrica)\n6. Finished (verifica integridade do handshake)\nComunicação cifrada com AES/ChaCha20.' },

  { id:'redes_034', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Portas Bem Conhecidas (Well-Known)',
    verso:'FTP: 20/21 | SSH: 22 | Telnet: 23 | SMTP: 25 | DNS: 53 | DHCP: 67/68 | HTTP: 80 | HTTPS: 443 | POP3: 110 | IMAP: 143 | SNMP: 161/162 | LDAP: 389 | RDP: 3389 | MySQL: 3306 | PostgreSQL: 5432\nPortas 0-1023: bem conhecidas; 1024-49151: registradas; 49152-65535: dinâmicas.' },

  { id:'redes_035', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'EIGRP — Enhanced IGRP',
    verso:'Protocolo de roteamento híbrido (vetor de distância avançado), proprietário Cisco. Usa algoritmo DUAL para calcular rotas livres de loops. Métrica composta por largura de banda e atraso (delay). Mantém tabela de vizinhos, tabela de topologia e tabela de roteamento. Convergência muito rápida.' },

  { id:'redes_036', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'LDAP — Lightweight Directory Access Protocol',
    verso:'Protocolo para acesso e gerenciamento de serviços de diretório (ex.: Active Directory). Porta 389 (TCP); LDAPS (com TLS): porta 636 (TCP). Estrutura hierárquica: DC (Domain Component), OU (Organizational Unit), CN (Common Name). Base para autenticação centralizada em redes corporativas.' },

  { id:'redes_037', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Proxy vs Proxy Reverso',
    verso:'Proxy direto (forward proxy): intermediário entre clientes internos e Internet. Funções: cache, filtragem de conteúdo, anonimização.\nProxy reverso: intermediário entre Internet e servidores internos. Funções: balanceamento de carga, terminação SSL, cache, proteção dos servidores (ex.: Nginx, HAProxy).' },

  { id:'redes_038', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'CDN — Content Delivery Network',
    verso:'Rede de servidores distribuídos geograficamente que armazena cópias de conteúdo estático (imagens, vídeos, JS, CSS) próximas ao usuário final. Reduz latência, alivia carga no servidor de origem e aumenta disponibilidade. Exemplos: Cloudflare, Akamai, AWS CloudFront.' },

  { id:'redes_039', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'Multicast — IGMP e PIM',
    verso:'Multicast envia um pacote a um grupo de receptores (endereços 224.0.0.0/4). IGMP (Internet Group Management Protocol) gerencia membros de grupos entre hosts e roteadores da rede local. PIM (Protocol Independent Multicast) distribui tráfego multicast entre roteadores; modos: Dense Mode e Sparse Mode.' },

  { id:'redes_040', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'SSH — Secure Shell',
    verso:'Protocolo de acesso remoto seguro (porta TCP 22). Substitui Telnet (texto claro). Oferece autenticação por senha ou par de chaves (pública/privada), criptografia (AES, ChaCha20) e integridade (HMAC). Também suporta tunelamento de portas (port forwarding) e transferência de arquivos (SCP, SFTP).' },

  { id:'redes_041', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Balanceamento de Carga',
    verso:'Distribui requisições entre múltiplos servidores para otimizar uso de recursos e garantir disponibilidade. Algoritmos: Round Robin, Least Connections, IP Hash, Weighted Round Robin. Pode operar em L4 (TCP/UDP) ou L7 (HTTP — permite decisões por URL, cookie). Exemplos: HAProxy, Nginx, AWS ELB.' },

  { id:'redes_042', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Diferença: Latência vs Throughput vs Largura de Banda',
    verso:'• Largura de banda: capacidade máxima teórica do link (ex.: 1 Gbps).\n• Throughput: taxa real de transferência efetiva, sempre ≤ largura de banda.\n• Latência: tempo que um pacote leva para ir da origem ao destino (ms).\n• Jitter: variação da latência; crítico para VoIP e streaming.' },

  { id:'redes_043', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'IEEE 802.1X — Controle de Acesso à Rede',
    verso:'Padrão de autenticação porta a porta em redes com fio e Wi-Fi. Componentes: suplicante (cliente), autenticador (switch/AP), servidor de autenticação (RADIUS). Fluxo: suplicante envia credenciais → autenticador repassa ao RADIUS → RADIUS valida e libera/bloqueia porta. Base do NAC (Network Access Control).' },

  { id:'redes_044', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'RADIUS vs TACACS+',
    verso:'RADIUS: padrão aberto (RFC 2865), UDP portas 1812/1813, combina autenticação e autorização, criptografa apenas a senha. Usado em Wi-Fi, VPN e acesso discado.\nTACACS+: proprietário Cisco, TCP porta 49, separa autenticação, autorização e accounting (AAA), criptografa o payload inteiro. Preferido para gerência de dispositivos de rede.' },

  { id:'redes_045', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'NTP — Network Time Protocol',
    verso:'Protocolo de sincronização de tempo (porta UDP 123). Organizado em estratos (stratum): stratum 0 = relógio atômico; stratum 1 = servidor diretamente conectado ao stratum 0; e assim por diante. Precisão de milissegundos na Internet, microssegundos em redes locais. Crítico para logs, certificados e Kerberos.' },

  { id:'redes_046', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Frame Relay vs ATM (WAN Legada)',
    verso:'Frame Relay: tecnologia WAN comutada por pacotes (L2), circuitos virtuais permanentes (PVC) ou comutados (SVC), identificados por DLCI. Sem correção de erros embutida.\nATM (Asynchronous Transfer Mode): células fixas de 53 bytes (5 header + 48 dados), suporte nativo a QoS, usado em backbones de telecom. Ambas substituídas por MPLS/Ethernet.' },

  { id:'redes_047', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Máscara /16 e Classe B',
    verso:'Máscara /16 = 255.255.0.0 → 65.536 endereços (65.534 hosts utilizáveis).\nClasse B original: 128.0.0.0 – 191.255.255.255, máscara padrão /16.\nHoje com CIDR, qualquer bloco pode ter máscara /16 independente de classe.\nEndereço de rede = todos os bits de host = 0; broadcast = todos = 1.' },

  { id:'redes_048', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'DNS over HTTPS (DoH) e DNS over TLS (DoT)',
    verso:'DoH: consultas DNS encapsuladas em HTTPS (porta 443), difícil de bloquear e monitorar por ISPs. DoT: DNS sobre TLS dedicado (porta 853), mais fácil de filtrar por firewalls corporativos. Ambos visam privacidade ao impedir que consultas DNS sejam interceptadas em texto claro.' },

  { id:'redes_049', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo RSTP (Rapid STP)',
    verso:'IEEE 802.1w — evolução do STP com convergência em ~1 segundo (STP pode levar 30–50 s). Introduz novos estados de porta: Discarding, Learning, Forwarding. Adiciona papéis: Alternate Port e Backup Port. Compatible com 802.1D. Recomendado para redes modernas; MSTP (802.1s) estende para múltiplas VLANs.' },

  { id:'redes_050', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'GRE — Generic Routing Encapsulation',
    verso:'Protocolo de tunelamento (RFC 2784) que encapsula pacotes de qualquer protocolo dentro de pacotes IP. Sem criptografia nativa — frequentemente combinado com IPSec para segurança. Protocolo IP número 47. Muito usado para tunelamento IPv6 sobre IPv4 (6in4) e em VPNs site-to-site dinâmicas com DMVPN.' },

  { id:'redes_051', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'HSRP — Hot Standby Router Protocol',
    verso:'Protocolo Cisco de redundância de gateway (FHRP). Um roteador ativo atende o tráfego; um em espera (standby) assume em caso de falha. O gateway virtual compartilha IP e MAC virtual. Equivalentes abertos: VRRP (RFC 3768) e GLBP (Cisco, balanceia carga entre múltiplos roteadores).' },

  { id:'redes_052', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Cabeamento — Cat5e, Cat6, Cat6a, Fibra',
    verso:'Cat5e: até 1 Gbps / 100m\nCat6: até 10 Gbps / 55m (100m para 1 Gbps)\nCat6a: até 10 Gbps / 100m\nFibra monomodo (SMF): longas distâncias (km), núcleo ~8-9µm, laser.\nFibra multimodo (MMF): curtas distâncias (~300-550m), núcleo 50/62,5µm, LED/VCSEL.' },

  { id:'redes_053', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'DNSSEC',
    verso:'Extensão do DNS que adiciona assinaturas digitais às respostas, garantindo autenticidade e integridade (mas não confidencialidade). Usa pares de chaves ZSK (Zone Signing Key) e KSK (Key Signing Key). Previne ataques de envenenamento de cache (DNS Cache Poisoning / Kaminsky Attack). Cadeia de confiança parte dos root servers.' },

  { id:'redes_054', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'DMZ — Zona Desmilitarizada em Redes',
    verso:'Sub-rede intermediária separada da rede interna e da Internet por firewalls. Hospeda serviços públicos (servidores web, e-mail, DNS externo) que precisam ser acessíveis externamente sem expor a rede interna. Arquitetura common: firewall externo → DMZ → firewall interno → rede corporativa.' },

  { id:'redes_055', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo LLDP e CDP',
    verso:'LLDP (Link Layer Discovery Protocol — IEEE 802.1AB): padrão aberto para descoberta de vizinhos em L2. Dispositivos anunciam identidade, capacidades e informações de porta.\nCDP (Cisco Discovery Protocol): proprietário Cisco, funcionalidade similar. Úteis para mapeamento automático de topologia.' },

  { id:'redes_056', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'WPA2 vs WPA3 (Wi-Fi Security)',
    verso:'WPA2 (802.11i): usa AES-CCMP para criptografia, autenticação PSK ou 802.1X (Enterprise). Vulnerável a ataques de dicionário offline no PSK e KRACK.\nWPA3: SAE (Simultaneous Authentication of Equals) substitui PSK, resistente a ataques de dicionário offline. Forward secrecy nativo. WPA3-Enterprise: 192-bit Suite B.' },

  { id:'redes_057', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo IMAP vs POP3 — Diferença chave',
    verso:'POP3: baixa e-mails no dispositivo e (por padrão) apaga do servidor. Porta 110 (ou 995 com SSL). Ideal para acesso em único dispositivo.\nIMAP: mantém e-mails no servidor, sincroniza estado entre múltiplos dispositivos. Porta 143 (ou 993 com SSL). Padrão moderno para múltiplos dispositivos.' },

  { id:'redes_058', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Broadcast, Multicast e Unicast',
    verso:'Unicast: comunicação 1-para-1 (um remetente, um destinatário).\nBroadcast: 1-para-todos no mesmo domínio de broadcast (ex.: 192.168.1.255).\nMulticast: 1-para-muitos selecionados (grupos multicast, 224.0.0.0/4).\nAnycast (IPv6 e DNS): 1-para-o-mais-próximo do grupo, usado em CDNs e DNS raiz.' },

  { id:'redes_059', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Traceroute — Como Funciona',
    verso:'Envia pacotes com TTL incrementando (1, 2, 3...). Cada roteador decrementa o TTL; ao chegar a 0, descarta e retorna ICMP Time Exceeded com seu IP. Assim mapeia cada salto até o destino. No Windows: tracert (usa ICMP). No Linux: traceroute (usa UDP por padrão, ou -I para ICMP). MTR combina ping + traceroute.' },

  { id:'redes_060', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'IPv6 — Tipos de Endereço',
    verso:'• Unicast global (2000::/3): roteável na Internet, equivalente ao IPv4 público.\n• Link-local (FE80::/10): válido apenas no segmento local, autoconfigurado.\n• Unique local (FC00::/7): equivalente ao privado IPv4 (RFC 1918).\n• Multicast (FF00::/8): substitui broadcast.\n• Loopback: ::1/128\n• Não especificado: ::/128' },

  { id:'redes_061', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'OSPF — Estados de Adjacência',
    verso:'Down → Init → 2-Way → ExStart → Exchange → Loading → Full.\nEstado Full = adjacência completa, LSDBs sincronizadas.\nEm redes multi-acesso (Ethernet), o DR (Designated Router) e BDR (Backup DR) são eleitos para reduzir o número de adjacências (n(n-1)/2 vira n-1).' },

  { id:'redes_062', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'HTTP — Métodos Principais',
    verso:'GET: recupera recurso (idempotente, sem body).\nPOST: envia dados, cria recurso (não idempotente).\nPUT: substitui recurso inteiro (idempotente).\nPATCH: atualiza recurso parcialmente.\nDELETE: remove recurso (idempotente).\nHEAD: como GET, mas só retorna headers.\nOPTIONS: retorna métodos suportados (útil para CORS).' },

  { id:'redes_063', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'HTTP — Códigos de Status',
    verso:'1xx: Informacional (100 Continue)\n2xx: Sucesso (200 OK, 201 Created, 204 No Content)\n3xx: Redirecionamento (301 Moved Permanently, 302 Found, 304 Not Modified)\n4xx: Erro do cliente (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests)\n5xx: Erro do servidor (500 Internal, 502 Bad Gateway, 503 Unavailable)' },

  { id:'redes_064', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'QUIC e HTTP/3',
    verso:'QUIC é protocolo de transporte desenvolvido pelo Google, padronizado pela IETF (RFC 9000). Roda sobre UDP, implementando internamente as funções de confiabilidade e controle de fluxo do TCP + TLS 1.3 integrado. HTTP/3 usa QUIC como transporte, eliminando o head-of-line blocking do TCP que afetava HTTP/2.' },

  { id:'redes_065', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Redes Definidas por Software (NFV)',
    verso:'Network Functions Virtualization: virtualização de funções de rede (firewall, roteador, balanceador, IDS) para rodar como VMs ou containers em hardware padrão (COTS), em vez de appliances dedicados. Reduz custo de hardware e aumenta agilidade na implantação. Complementar ao SDN; ambos são base das redes 5G e data centers modernos.' },

  { id:'redes_066', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Half-Duplex vs Full-Duplex',
    verso:'Half-duplex: comunicação em apenas um sentido por vez (ex.: rádio walkie-talkie, hubs). Colisões possíveis → CSMA/CD.\nFull-duplex: comunicação simultânea nos dois sentidos. Switches modernos operam em full-duplex, eliminando colisões e dispensando CSMA/CD. Doubles efetivo throughput do link.' },

  { id:'redes_067', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'CSMA/CD e CSMA/CA',
    verso:'CSMA/CD (Collision Detection): usado em Ethernet cabeada. Detecta colisão, para transmissão e aguarda tempo aleatório (backoff exponencial). Hoje irrelevante pois switches full-duplex eliminam colisões.\nCSMA/CA (Collision Avoidance): usado em Wi-Fi (802.11). Evita colisões aguardando canal livre + backoff aleatório antes de transmitir.' },

  { id:'redes_068', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'Protocolo SCTP',
    verso:'Stream Control Transmission Protocol (RFC 4960) — protocolo de transporte alternativo ao TCP e UDP. Multi-homing (múltiplos IPs por associação), multi-stream (evita head-of-line blocking), orientado a mensagens. Usado em SS7 sobre IP (telecom) e sinalização de voz. Resistente a ataques SYN flood por usar cookie 4-way handshake.' },

  { id:'redes_069', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Comandos de Diagnóstico de Rede',
    verso:'ping: testa conectividade via ICMP Echo.\ntraceroute/tracert: mapeia rota hop a hop.\nnslookup / dig: consultas DNS.\nnetstat / ss: conexões ativas e portas em escuta.\nifconfig / ip addr: configuração de interfaces.\narp -a: tabela ARP local.\nnmap: varredura de portas.\nWireshark / tcpdump: captura e análise de pacotes.' },

  { id:'redes_070', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'SLA — Service Level Agreement em Redes',
    verso:'Acordo formal entre provedor e cliente definindo métricas mínimas de serviço: disponibilidade (ex.: 99,9% = ~8,7h downtime/ano), latência máxima, jitter, perda de pacotes, MTTR (Mean Time to Repair) e MTBF (Mean Time Between Failures). Descumprimento implica penalidades contratuais.' },

  { id:'redes_071', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'EVPN e VXLAN',
    verso:'VXLAN (Virtual Extensible LAN, RFC 7348): estende redes L2 sobre roteamento L3 usando encapsulamento UDP (porta 4789). Suporta até 16 milhões de segmentos (vs 4.094 do 802.1Q). EVPN (Ethernet VPN, RFC 7432): plano de controle BGP para VXLAN, distribuindo informações de MAC/IP. Base dos data centers modernos (DC fabric).' },

  { id:'redes_072', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'ACL — Access Control List em Redes',
    verso:'Lista de regras em roteadores/firewalls que permitem ou negam tráfego com base em critérios (IP origem/destino, protocolo, porta). ACL padrão (standard): filtra apenas por IP de origem. ACL estendida (extended): filtra por IP origem/destino, protocolo e porta. Regras avaliadas em ordem; última regra implícita: deny all.' },

  { id:'redes_073', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'MAN, WAN, LAN, PAN',
    verso:'PAN (Personal Area Network): alcance pessoal, ~10m. Ex.: Bluetooth, NFC.\nLAN (Local Area Network): prédio/campus. Ex.: Ethernet, Wi-Fi.\nMAN (Metropolitan Area Network): cidade. Ex.: Metro Ethernet, WiMAX.\nWAN (Wide Area Network): país/mundo. Ex.: Internet, MPLS, Frame Relay.\nSAN: rede de armazenamento (storage).' },

  { id:'redes_074', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Portocolo 802.11 — SSID e BSS',
    verso:'SSID (Service Set Identifier): nome da rede Wi-Fi (até 32 caracteres).\nBSS (Basic Service Set): célula formada por um AP e seus clientes.\nESS (Extended Service Set): conjunto de BSSs com mesmo SSID — roaming entre APs.\nIBSS (ad hoc): rede Wi-Fi sem AP, peer-to-peer.\nChannel: para 2,4 GHz, canais 1, 6 e 11 são os não sobrepostos.' },

  { id:'redes_075', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'Zero Trust Network Architecture',
    verso:'Modelo de segurança que elimina a confiança implícita baseada em localização de rede ("dentro do perímetro = confiável"). Princípios: verificar explicitamente sempre (identidade, dispositivo, localização), usar acesso de menor privilégio, assumir comprometimento. Implementado com IAM forte, microsegmentação e inspeção contínua.' },

  { id:'redes_076', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo PPTP vs L2TP',
    verso:'PPTP (Point-to-Point Tunneling Protocol): Microsoft, porta TCP 1723. Criptografia fraca (MS-CHAPv2), considerado inseguro. Evitar.\nL2TP (Layer 2 Tunneling Protocol): combinado com IPSec para segurança. Porta UDP 1701. Mais seguro que PPTP. Amplamente suportado em sistemas operacionais como opção de VPN nativa.' },

  { id:'redes_077', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'APIPA — Automatic Private IP Addressing',
    verso:'Quando um host não consegue obter IP via DHCP, atribui automaticamente um endereço na faixa 169.254.0.0/16 (RFC 3927). Permite comunicação apenas na rede local (link-local). No Windows: condição de "Limited connectivity". No Linux equivalente: endereços link-local autoconfigurados via zeroconf.' },

  { id:'redes_078', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Modelo Cliente-Servidor vs P2P',
    verso:'Cliente-Servidor: servidor centralizado provê recursos; clientes requisitam (HTTP, FTP, SMTP). Escalabilidade depende do servidor; ponto único de falha.\nPeer-to-Peer (P2P): cada nó é cliente e servidor simultaneamente (BitTorrent, blockchain). Mais resiliente e distribuído, mas dificulta controle e segurança.' },

  { id:'redes_079', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'TCP — Controle de Congestionamento',
    verso:'Algoritmos para evitar saturar a rede:\n• Slow Start: janela começa pequena, dobra a cada RTT até ssthresh.\n• Congestion Avoidance: após ssthresh, cresce linearmente (+1 MSS/RTT).\n• Fast Retransmit: 3 ACKs duplicados → retransmite sem esperar timeout.\n• Fast Recovery: reduz janela pela metade (não volta ao slow start após fast retransmit).' },

  { id:'redes_080', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Segurança em Switches — Port Security',
    verso:'Recurso Cisco que limita quais MACs podem usar uma porta do switch. Ações ao violar: Protect (descarta, sem log), Restrict (descarta + log), Shutdown (desativa porta). Previne ataques de MAC Flooding (que saturam a tabela CAM do switch, degenerando-o a comportamento de hub). Complemento ao 802.1X.' },

  { id:'redes_081', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo TFTP',
    verso:'Trivial File Transfer Protocol — porta UDP 69. Versão simplificada do FTP, sem autenticação ou criptografia. Usado em ambientes controlados: boot de PXE (inicialização de rede), atualização de firmware de equipamentos de rede, carregamento de configuração inicial em roteadores/switches (bootstrap). Não usar na Internet.' },

  { id:'redes_082', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'TCP vs UDP — Tabela Comparativa',
    verso:'TCP: orientado a conexão, confiável, controle de fluxo/congestionamento, ordenação de bytes, header 20-60 bytes. Ex.: HTTP, HTTPS, FTP, SMTP, SSH.\nUDP: sem conexão, sem garantia, sem ordenação, header 8 bytes, menor overhead. Ex.: DNS, DHCP, SNMP, RIP, streaming, VoIP, jogos online, NTP.' },

  { id:'redes_083', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'IDS vs IPS',
    verso:'IDS (Intrusion Detection System): monitora e alerta sobre atividades suspeitas; modo passivo (apenas detecta, não bloqueia). Pode ser Network-based (NIDS) ou Host-based (HIDS).\nIPS (Intrusion Prevention System): detecta E bloqueia ataques inline; ativo no fluxo de tráfego. Risco de falsos positivos bloquearem tráfego legítimo.' },

  { id:'redes_084', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo RTSP e RTP',
    verso:'RTP (Real-time Transport Protocol): protocolo de transporte para mídia de tempo real (áudio/vídeo) sobre UDP. Inclui sequenciamento e timestamp para sincronização, mas sem garantia de entrega.\nRTSP (Real-Time Streaming Protocol): protocolo de controle (play, pause, stop) para sessões RTP. Porta TCP/UDP 554.' },

  { id:'redes_085', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Endereço MAC — Estrutura',
    verso:'48 bits (6 octetos) em hexadecimal (ex.: 00:1A:2B:3C:4D:5E).\n• Primeiros 3 octetos: OUI (Organizationally Unique Identifier) — identifica o fabricante.\n• Últimos 3 octetos: NIC-specific — número de série da interface.\nBit I/G (bit 0 do primeiro octeto): 0 = unicast, 1 = multicast/broadcast.\nBit U/L (bit 1): 0 = globalmente único, 1 = administrado localmente.' },

  { id:'redes_086', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'PXE Boot — Inicialização de Rede',
    verso:'Preboot Execution Environment: permite que um computador inicialize via rede sem disco local. Fluxo: DHCP → obtém IP + endereço do servidor TFTP → baixa imagem de boot via TFTP → executa OS ou agente de provisionamento. Muito usado em data centers para deploy automatizado (bare-metal provisioning).' },

  { id:'redes_087', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo WebSocket',
    verso:'Protocolo full-duplex bidirecional sobre uma única conexão TCP (RFC 6455). Começa com handshake HTTP (Upgrade: websocket), depois promove a conexão. Mantém canal aberto persistente para comunicação em tempo real (chats, dashboards, jogos online). Porta 80 (ws://) ou 443 (wss:// com TLS).' },

  { id:'redes_088', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Proxy ARP',
    verso:'Técnica em que um roteador responde a requisições ARP em nome de hosts em outra rede, permitindo que dispositivos sem rota configurada alcancem destinos remotos. O roteador usa seu próprio MAC para responder. Útil em ambientes legados sem roteamento configurado nos hosts, mas pode criar problemas de segurança (ARP spoofing).' },

  { id:'redes_089', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'MPLS — Rótulos e LSP',
    verso:'Label: valor de 20 bits inserido entre L2 e L3. Campos do label stack: Label (20 bits), TC/EXP (3 bits QoS), S-bit (bottom of stack), TTL (8 bits).\nLSP (Label Switched Path): caminho pré-determinado por onde os pacotes são comutados.\nLDP (Label Distribution Protocol) ou RSVP-TE distribuem os rótulos entre LSRs.' },

  { id:'redes_090', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'IEEE 802.3af / 802.3at — PoE',
    verso:'Power over Ethernet: fornece energia elétrica junto com dados pelo cabo UTP.\n• 802.3af (PoE): até 15,4W por porta (12,95W no dispositivo).\n• 802.3at (PoE+): até 30W por porta (25,5W no dispositivo).\n• 802.3bt (PoE++): até 60W ou 100W.\nAplicações: telefones IP, câmeras IP, APs Wi-Fi, sensores IoT.' },

  { id:'redes_091', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Packet Switching vs Circuit Switching',
    verso:'Circuit Switching (comutação de circuitos): circuito físico/lógico dedicado reservado antes da comunicação (ex.: PSTN, ISDN). Recursos garantidos, mas desperdiçados se há silêncio.\nPacket Switching (comutação de pacotes): dados divididos em pacotes enviados independentemente pela rede (ex.: Internet). Uso eficiente, sem reserva prévia; sujeito a congestionamento.' },

  { id:'redes_092', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Loopback e Endereços Especiais IPv4',
    verso:'127.0.0.1 (127.0.0.0/8): loopback — testa pilha TCP/IP local sem enviar pelo cabo.\n0.0.0.0: endereço não especificado / rota padrão (default route).\n255.255.255.255: broadcast limitado (toda a rede local).\n169.254.0.0/16: APIPA (link-local automático quando DHCP falha).\n224.0.0.0/4: multicast.' },

  { id:'redes_093', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'TCP Head-of-Line Blocking',
    verso:'Problema do TCP: se um segmento é perdido, todos os segmentos seguintes (mesmo recebidos) ficam travados esperando a retransmissão, pois o TCP garante ordem. Impacto severo em HTTP/1.1. HTTP/2 resolve para múltiplas streams dentro de uma conexão TCP... mas o head-of-line do TCP ainda afeta todas elas. HTTP/3 sobre QUIC/UDP elimina este problema.' },

  { id:'redes_094', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo NFS e SMB/CIFS',
    verso:'NFS (Network File System): protocolo Unix/Linux para compartilhamento de arquivos em rede (porta 2049 TCP/UDP). Stateless em NFSv3, stateful em NFSv4.\nSMB (Server Message Block) / CIFS: protocolo Windows para compartilhamento de arquivos, impressoras e recursos (porta 445 TCP). Base do Samba para integração Linux-Windows.' },

  { id:'redes_095', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo BGP — Atributos de Caminho',
    verso:'• AS-PATH: lista de ASs percorridos; mais curto preferido; detecta loops.\n• NEXT-HOP: próximo roteador para o prefixo.\n• LOCAL-PREF: preferência interna (iBGP); maior = preferido.\n• MED: Multi-Exit Discriminator; menor = preferido; influencia tráfego de entrada.\n• ORIGIN: i (IGP) > e (EGP) > ? (incompleto).\n• WEIGHT (Cisco): local, não propagado; maior = preferido.' },

  { id:'redes_096', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Fácil',
    frente:'Protocolo Telnet',
    verso:'Protocolo de acesso remoto de terminal (porta TCP 23). Sem criptografia — todas as credenciais e dados trafegam em texto claro, visíveis a qualquer captura de pacotes. Obsoleto; substituído pelo SSH (porta 22) em ambientes modernos. Ainda encontrado em equipamentos de rede legados e embutidos (IoT antigos).' },

  { id:'redes_097', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'ECMP — Equal Cost Multi Path',
    verso:'Técnica de roteamento que distribui tráfego por múltiplos caminhos de custo igual simultaneamente, aumentando throughput e redundância sem eleição de caminho principal/secundário. Suportado por OSPF, IS-IS e BGP. Balanceamento pode ser por fluxo (5-tupla hash) ou por pacote (pode causar reordenação).' },

  { id:'redes_098', banca:'Cebraspe', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'IEEE 802.1Q — VLAN Tagging',
    verso:'Padrão que insere uma tag de 4 bytes no frame Ethernet para identificar a VLAN. Campos: TPID (0x8100, identifica que é tagged), PCP (3 bits de prioridade QoS/CoS), DEI (1 bit), VID (12 bits = 4.094 VLANs possíveis, 1 e 4094 reservadas). Usado em portas trunk entre switches e roteadores.' },

  { id:'redes_099', banca:'FGV', materia:'Redes de Computadores', dificuldade:'Médio',
    frente:'Protocolo SYSLOG',
    verso:'Padrão para envio de mensagens de log de dispositivos de rede para um servidor centralizado. Porta UDP 514 (ou TCP 514/601 para confiabilidade). 8 níveis de severidade: 0-Emergency, 1-Alert, 2-Critical, 3-Error, 4-Warning, 5-Notice, 6-Informational, 7-Debug. Fundamental para monitoramento, auditoria e resposta a incidentes.' },

  { id:'redes_100', banca:'FCC', materia:'Redes de Computadores', dificuldade:'Difícil',
    frente:'Redes 5G — Arquitetura e Características',
    verso:'Latência ultra-baixa (~1ms), velocidades até 20 Gbps, suporte a até 1 milhão de dispositivos/km². Faixas: sub-6 GHz (cobertura ampla) e mmWave (30-300 GHz, alta velocidade, curto alcance). Arquitetura baseada em Network Slicing (múltiplas redes virtuais sobre mesma infraestrutura), MEC (Mobile Edge Computing) e SDN/NFV.' },
];
