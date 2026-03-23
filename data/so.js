// ─────────────────────────────────────────────────────────────────────────────
//  data/so.js — Sistemas Operacionais (100 cards)
// ─────────────────────────────────────────────────────────────────────────────

export default [
  // ── Processos & Threads ───────────────────────────────────────────────────
  { id:'so_001', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Processo vs. Thread',
    verso:'Processo: instância de programa em execução com espaço de endereçamento próprio, PCB, arquivos e recursos isolados.\nThread: unidade de execução dentro de um processo; compartilha memória, heap e arquivos com outras threads do mesmo processo, mas tem pilha e registradores próprios. Threads são mais leves de criar/trocar de contexto.' },

  { id:'so_002', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'PCB — Process Control Block',
    verso:'Estrutura do kernel que armazena todo o contexto de um processo: PID, estado, contador de programa, registradores, ponteiros para tabela de páginas, arquivos abertos, prioridade e informações de escalonamento. O SO salva/restaura o PCB em cada troca de contexto (context switch).' },

  { id:'so_003', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Estados de um Processo',
    verso:'Ciclo de vida clássico:\n• Novo (New) → admissão\n• Pronto (Ready): aguarda CPU\n• Executando (Running): usando CPU\n• Bloqueado (Waiting/Blocked): aguarda I/O ou evento\n• Terminado (Terminated)\nTransições: dispatch, preempção, bloqueio por I/O e conclusão de I/O.' },

  { id:'so_004', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Escalonamento Round-Robin',
    verso:'Cada processo recebe um quantum de tempo fixo na CPU. Ao esgotar o quantum, o processo é preemptado e volta ao final da fila de prontos. Favorece equidade (fairness). Quantum pequeno → mais trocas de contexto; quantum grande → se comporta como FCFS. Muito usado em sistemas de tempo compartilhado.' },

  { id:'so_005', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Escalonamento SJF — Shortest Job First',
    verso:'Seleciona o processo com menor burst de CPU esperado. Minimiza o tempo médio de espera (ótimo nesse critério). Problema: difícil de saber o burst futuro (usa estimativa por média exponencial). Versão preemptiva chamada SRTF (Shortest Remaining Time First).' },

  { id:'so_006', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Escalonamento FCFS',
    verso:'First-Come, First-Served: não preemptivo, processa na ordem de chegada. Simples de implementar (fila FIFO). Desvantagem: efeito comboio — processos curtos ficam presos atrás de processos longos, aumentando tempo médio de espera.' },

  { id:'so_007', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'Escalonamento por Prioridade + Aging',
    verso:'CPU é alocada ao processo de maior prioridade. Problema: starvation — processos de baixa prioridade podem nunca executar. Solução: aging (envelhecimento) — a prioridade aumenta gradualmente com o tempo de espera, garantindo que todo processo eventualmente execute.' },

  { id:'so_008', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Deadlock — Condições de Coffman',
    verso:'Para ocorrer deadlock, as 4 condições devem ser simultâneas:\n1. Exclusão mútua — recurso não compartilhável.\n2. Hold and wait — processo retém recurso e aguarda outro.\n3. Sem preempção — recursos não podem ser forçadamente retirados.\n4. Espera circular — ciclo de dependências entre processos.' },

  { id:'so_009', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'Algoritmo do Banqueiro (Deadlock Avoidance)',
    verso:'Algoritmo de Dijkstra que verifica se a alocação de um recurso leva a um estado seguro (existe sequência de execução em que todos os processos terminam). Mantém vetores Available, Allocation e Need. Se o estado resultante for inseguro, o pedido é negado.' },

  { id:'so_010', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Mutex vs. Semáforo',
    verso:'Mutex (mutual exclusion lock): binário, apenas a thread que adquiriu pode liberar. Usado para seção crítica.\nSemáforo: contador inteiro, pode ser binário ou contável. P() (wait) decrementa; V() (signal) incrementa. Utilizado para sincronização e controle de acesso a N recursos. Semáforo binário pode ser usado como mutex, mas sem a restrição de "dono".' },

  { id:'so_011', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Problema Produtor-Consumidor',
    verso:'Clássico de sincronização: produtor gera itens em buffer circular; consumidor os consome. Solução com semáforos: empty (inicia = N), full (inicia = 0), mutex (inicia = 1). Produtor: P(empty) → P(mutex) → insere → V(mutex) → V(full). Consumidor: P(full) → P(mutex) → remove → V(mutex) → V(empty).' },

  { id:'so_012', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'Problema dos Filósofos Jantando',
    verso:'5 filósofos ao redor da mesa, cada um precisa de 2 garfos. Solução sem deadlock: assimétrico (filósofo ímpar pega esquerdo depois direito; par faz o contrário), ou garçom (semáforo que limita a 4 filósofos simultâneos), ou monitor com verificação de estado dos vizinhos.' },

  // ── Gerenciamento de Memória ───────────────────────────────────────────────
  { id:'so_013', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Paginação de Memória',
    verso:'Divide memória física em frames e espaço virtual em páginas de mesmo tamanho (ex: 4 KB). Tabela de páginas mapeia página virtual → frame físico. Elimina fragmentação externa. Pode causar fragmentação interna (última página não completamente usada). TLB acelera a tradução de endereços.' },

  { id:'so_014', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'TLB — Translation Lookaside Buffer',
    verso:'Cache de hardware para entradas da tabela de páginas. Armazena mapeamentos página→frame mais recentes. TLB hit: tradução direta sem acessar memória; TLB miss: consulta tabela de páginas na RAM e carrega no TLB. Taxa de hit típica > 99%. Flushed em trocas de contexto ou taga com ASID.' },

  { id:'so_015', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'Segmentação de Memória',
    verso:'Divide o espaço de endereçamento em segmentos de tamanho variável (código, dados, pilha, heap). Tabela de segmentos contém base + limite. Suporta compartilhamento e proteção por segmento. Causa fragmentação externa. Arquiteturas modernas combinam segmentação + paginação (ex: x86 com GDT/LDT + paginação).' },

  { id:'so_016', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Memória Virtual — Page Fault',
    verso:'Ocorre quando a página referenciada não está na memória física. SO salva estado do processo, localiza a página em disco (swap), escolhe frame para substituição (algoritmo de substituição), carrega a página e atualiza a tabela. Processo retoma. Thrashing: excesso de page faults prejudica desempenho.' },

  { id:'so_017', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'Algoritmo de Substituição de Página LRU',
    verso:'Least Recently Used: substitui a página há mais tempo sem ser referenciada. Bom aproximador do ótimo (OPT). Implementação exata é cara (timestamp ou pilha). Aproximações: algoritmo do relógio (clock), CLOCK melhorado (bit de referência + sujo). Mais usado na prática com NFU ou aging.' },

  { id:'so_018', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Algoritmo de Substituição FIFO vs. OPT',
    verso:'FIFO: substitui a página mais antiga na memória. Simples mas pode sofrer anomalia de Bélády (mais frames → mais page faults). OPT (Ótimo): substitui a página que será usada mais tarde no futuro. Impossível de implementar na prática (exige conhecimento futuro), mas serve como baseline teórico.' },

  { id:'so_019', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Swapping',
    verso:'Técnica de mover o processo inteiro (ou página) da RAM para disco (swap space/área de paginação) quando a memória está cheia, liberando frames para outros processos. Disco é muito mais lento que RAM, então swapping excessivo degrada desempenho drasticamente (thrashing).' },

  { id:'so_020', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Fragmentação Interna vs. Externa',
    verso:'Fragmentação interna: espaço alocado maior que o necessário (sobra dentro do bloco). Causada por paginação — última página do processo com espaço desperdiçado.\nFragmentação externa: espaço total livre suficiente, mas não contíguo. Causada por segmentação/alocação variável. Solução: compactação (cara) ou paginação.' },

  // ── Sistemas de Arquivos ───────────────────────────────────────────────────
  { id:'so_021', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Sistema de Arquivos — Inode (ext)',
    verso:'Estrutura de metadados do Linux/Unix que armazena: permissões, dono, grupo, timestamps (acesso, modificação, mudança), tamanho e ponteiros para blocos de dados. Cada arquivo tem um inode; nome do arquivo fica no diretório (entrada de diretório). Inode não armazena o nome do arquivo.' },

  { id:'so_022', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'NTFS — New Technology File System',
    verso:'Sistema de arquivos padrão do Windows NT em diante. Recursos: journaling (log de transações), ACLs granulares, compressão e criptografia nativas (EFS), suporte a arquivos > 4 GB, MFT (Master File Table). Tamanho máximo de volume: 256 TB (com clusters de 64 KB).' },

  { id:'so_023', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Journaling em Sistemas de Arquivos',
    verso:'Técnica de log (diário) que registra as operações antes de executá-las. Em caso de falha, o SO usa o journal para desfazer (undo) ou refazer (redo) operações incompletas, garantindo consistência. Ext3/ext4, NTFS e XFS usam journaling. Sem journaling (ext2), fsck é necessário após falha.' },

  { id:'so_024', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Permissões Linux — rwx',
    verso:'Cada arquivo/diretório tem permissões para 3 grupos: dono (user), grupo (group), outros (others).\nr=4, w=2, x=1. chmod 755 = rwxr-xr-x. Para diretório, x = permissão de entrar. Permissões especiais: SUID (executa como dono), SGID (como grupo), Sticky bit (só dono deleta no diretório).' },

  { id:'so_025', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Hard Link vs. Soft Link (Symlink)',
    verso:'Hard link: aponta diretamente para o inode do arquivo (mesmo inode, apenas nova entrada de diretório). O arquivo persiste enquanto houver pelo menos um hard link. Não funciona entre filesystems diferentes.\nSoft link (symlink): aponta para o caminho do arquivo. Pode cruzar filesystems. Quebra se o arquivo original for removido.' },

  // ── Linux & Comandos ──────────────────────────────────────────────────────
  { id:'so_026', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Sinais no Linux — kill, SIGTERM, SIGKILL',
    verso:'Sinais são notificações assíncronas enviadas a processos.\n• SIGTERM (15): solicita encerramento gracioso (processo pode tratar).\n• SIGKILL (9): encerramento imediato, não pode ser capturado/ignorado.\n• SIGHUP (1): reinicialização de daemon.\n• SIGINT (2): equivale ao Ctrl+C.\nComando kill -9 PID força terminação.' },

  { id:'so_027', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Comandos Linux — ps, top, htop',
    verso:'ps: lista processos do sistema. ps aux mostra todos os processos com detalhes (PID, CPU%, MEM%, comando).\ntop: monitor interativo em tempo real de processos, CPU e memória.\nhtop: versão aprimorada do top com interface colorida, scroll e kill interativo. Não instalado por padrão em todos os sistemas.' },

  { id:'so_028', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Pipe e Redirecionamento no Shell',
    verso:'Pipe (|): conecta stdout de um comando ao stdin de outro. Ex: ps aux | grep nginx.\nRedirecionamento: > (sobrescreve arquivo), >> (anexa), < (entrada de arquivo), 2> (redireciona stderr), 2>&1 (redireciona stderr para stdout). Tee: grava em arquivo E exibe no stdout simultaneamente.' },

  { id:'so_029', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Hierarquia de Diretórios Linux — FHS',
    verso:'Filesystem Hierarchy Standard:\n/bin: binários essenciais\n/etc: configurações do sistema\n/home: diretórios de usuários\n/var: dados variáveis (logs, spool)\n/tmp: arquivos temporários\n/usr: programas e bibliotecas de usuário\n/proc: sistema de arquivos virtual do kernel\n/dev: arquivos de dispositivos' },

  { id:'so_030', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Runlevels e Systemd Targets',
    verso:'No SysV Init, runlevels definem o estado do SO (0=desligar, 1=monousuário, 3=multiusuário sem GUI, 5=multiusuário com GUI, 6=reiniciar).\nNo systemd (moderno): targets equivalentes — poweroff.target, rescue.target, multi-user.target, graphical.target, reboot.target. systemctl isolate multi-user.target muda o target.' },

  // ── Virtualização ─────────────────────────────────────────────────────────
  { id:'so_031', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Virtualização — Hipervisor Tipo 1 vs. Tipo 2',
    verso:'Tipo 1 (bare-metal): roda diretamente sobre o hardware sem SO hospedeiro. Ex: VMware ESXi, Hyper-V, Xen, KVM. Maior desempenho e segurança.\nTipo 2 (hosted): roda sobre um SO hospedeiro comum. Ex: VMware Workstation, VirtualBox, Parallels. Mais fácil de usar, menor desempenho relativo.' },

  { id:'so_032', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Container vs. Máquina Virtual',
    verso:'VM: virtualiza hardware completo, cada VM tem SO convidado próprio. Isolamento forte, overhead alto (GB de RAM, minutos para iniciar).\nContainer (Docker): compartilha kernel do host, isola via namespaces e cgroups. Lightweight (MB, segundos para iniciar), ideal para microservices. Menos isolamento que VM.' },

  { id:'so_033', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Namespaces e cgroups (Linux)',
    verso:'Namespaces: isolam visão de recursos do sistema por processo (PID, rede, montagem, usuário, UTS, IPC). Base do isolamento de containers.\ncgroups (control groups): limitam e monitoram uso de recursos (CPU, memória, I/O de disco, rede) por grupo de processos. Docker usa ambos para isolar e limitar containers.' },

  // ── Sistemas de Tempo Real ────────────────────────────────────────────────
  { id:'so_034', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'RTOS — Sistema Operacional de Tempo Real',
    verso:'SO cujo objetivo é garantir resposta dentro de prazos determinísticos (deadlines). Hard real-time: perda de deadline é catastrófico (ex: controle de voo, marca-passo). Soft real-time: degradação aceitável (ex: streaming de vídeo). Escalonamento EDF (Earliest Deadline First) e Rate Monotonic usados em RTOS.' },

  { id:'so_035', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Chamadas de Sistema (Syscalls)',
    verso:'Interface entre processo em modo usuário e o kernel. Processo executa instrução especial (int 0x80, syscall) que troca para modo kernel. Exemplos: fork(), exec(), read(), write(), open(), close(), mmap(), socket(). Protective boundary: evita que processos acessem hardware diretamente.' },

  { id:'so_036', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Modo Usuário vs. Modo Kernel',
    verso:'Modo usuário (ring 3): execução de processos comuns sem acesso direto ao hardware. Instruções privilegiadas geram exceção.\nModo kernel (ring 0): execução do SO com acesso total ao hardware e memória. Transição ocorre via syscalls, interrupções e exceções. Separação fundamental para segurança e estabilidade.' },

  { id:'so_037', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Interrupções — Hardware e Software',
    verso:'Interrupção de hardware: sinal assíncrono do dispositivo (teclado, disco, NIC) ao CPU solicitando atenção. CPU pausas execução atual, salva contexto, executa ISR (Interrupt Service Routine) e retoma.\nInterrupção de software (trap/exceção): síncrona, causada por instrução (syscall, divisão por zero, page fault). Vetor de interrupções mapeia número → ISR.' },

  { id:'so_038', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Escalonamento Multiprocessador — SMP',
    verso:'Symmetric Multiprocessing: todos os CPUs compartilham mesma memória e executam o mesmo SO. Desafios: afinidade de CPU (processo prefere rodar no mesmo core para cache quente), balanceamento de carga, acesso à fila de prontos (precisa de lock). NUMA considera custo de acesso a memória remota.' },

  { id:'so_039', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Boot Process — BIOS/UEFI e GRUB',
    verso:'1. Power-on → CPU executa BIOS/UEFI (firmware).\n2. POST (Power-On Self Test).\n3. BIOS encontra MBR/GPT no disco de boot → carrega bootloader (GRUB).\n4. GRUB carrega kernel do SO.\n5. Kernel monta root filesystem, inicializa drivers.\n6. Init/systemd (PID 1) inicia serviços e sessão do usuário.' },

  { id:'so_040', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Escalonamento de Threads — M:N Model',
    verso:'Modelos de mapeamento de threads:\n• 1:1 (one-to-one): thread de usuário → thread de kernel. Linux/Windows. Paralelismo real em multi-core.\n• N:1: N threads usuário → 1 kernel thread. Blocking syscall bloqueia todas.\n• M:N: M threads usuário → N kernel threads. Flexível. Implementação complexa (Go goroutines, Erlang).' },

  { id:'so_041', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Fork e Exec no Unix/Linux',
    verso:'fork(): cria cópia exata do processo (filho), retorna PID do filho ao pai e 0 ao filho. Copy-on-write evita cópia imediata da memória.\nexec(): substitui a imagem do processo atual por um novo programa. Combinação fork+exec é o padrão para criar novos processos no Unix. Shell usa esse padrão para executar comandos.' },

  { id:'so_042', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'IPC — Inter-Process Communication',
    verso:'Mecanismos de comunicação entre processos:\n• Pipe: unidirecional, entre processos relacionados.\n• Named pipe (FIFO): pipe com nome no filesystem.\n• Shared Memory: mais rápido, requer sincronização.\n• Message Queue: mensagens assíncronas.\n• Socket: comunicação local ou em rede.\n• Sinal: notificação assíncrona.' },

  { id:'so_043', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Condição de Corrida (Race Condition)',
    verso:'Situação em que o resultado de operações concorrentes depende da ordem de execução das threads. Ocorre quando múltiplas threads acessam e modificam dados compartilhados sem sincronização. Prevenção: seções críticas protegidas por mutex, operações atômicas ou estruturas de dados thread-safe.' },

  { id:'so_044', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'Algoritmo de Peterson (Exclusão Mútua)',
    verso:'Solução de software para exclusão mútua de 2 processos, sem suporte de hardware. Usa variáveis flag[2] e turn. Garantias: exclusão mútua, progresso e espera limitada. Ineficiente em hardware moderno (reordenamento de instruções) sem barreiras de memória, mas importante como prova de conceito.' },

  { id:'so_045', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Sistema de Arquivos FAT32 vs. exFAT',
    verso:'FAT32: máx. 4 GB por arquivo, máx. 8 TB de volume. Compatibilidade universal.\nexFAT (Extended FAT): sem limite prático de arquivo (128 PB teórico), volumes até 512 TB. Criado para Flash/SD cards. Sem journaling em ambos. NTFS tem journaling e ACLs mas é somente leitura nativa em macOS (sem drivers extras).' },

  { id:'so_046', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Política vs. Mecanismo no SO',
    verso:'Princípio de projeto: mecanismo define o como (implementação genérica), política define o quê (decisão em alto nível). Ex: o escalonador (mecanismo) troca a CPU; a política é Round-Robin ou prioridade. Separar os dois permite mudar a política sem reimplementar o mecanismo. Microkernels levam essa separação ao extremo.' },

  { id:'so_047', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Microkernel vs. Kernel Monolítico',
    verso:'Monolítico: todos os serviços (drivers, FS, rede, IPC) no espaço do kernel. Rápido, mas falha em driver derruba o SO. Ex: Linux, Windows.\nMicrokernel: apenas IPC, gerenciamento básico de memória e escalonamento no kernel. Demais serviços rodam como processos de usuário. Mais estável, mais lento por IPC. Ex: Minix, QNX, L4.' },

  { id:'so_048', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'RAID — Níveis 0, 1, 5 e 6',
    verso:'RAID 0 (striping): desempenho máximo; sem redundância; 1 disco falha = perda total.\nRAID 1 (mirroring): espelho; 100% de redundância; custo: 50% de capacidade útil.\nRAID 5: striping com paridade distribuída; tolera 1 falha; mínimo 3 discos.\nRAID 6: 2 paridades; tolera 2 falhas; mínimo 4 discos. RAID 10 (1+0): espelho de stripes.' },

  { id:'so_049', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Escalonamento de Disco — SSTF e SCAN',
    verso:'SSTF (Shortest Seek Time First): atende a requisição mais próxima da cabeça atual. Melhor que FCFS mas pode causar starvation.\nSCAN (Elevador): move a cabeça em uma direção, atendendo requisições até o fim, depois inverte. C-SCAN: só atende em uma direção, retorna rapidamente ao início. Evita starvation.' },

  { id:'so_050', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Dispositivos de Bloco vs. Caractere',
    verso:'Dispositivo de bloco: transfere dados em blocos de tamanho fixo, permite acesso aleatório. Ex: disco rígido (HDD/SSD), pen drive. Representado em /dev/sdX.\nDispositivo de caractere: transfere bytes sequencialmente, sem buffer de bloco. Ex: teclado, mouse, terminal serial, impressora. Representado em /dev/ttyX.' },

  { id:'so_051', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Proteção de Memória — NX Bit / DEP',
    verso:'NX bit (No-Execute) / XD bit: marca páginas de memória como não-executáveis. Previne execução de código em áreas de dados/pilha (ataques de buffer overflow com shellcode). DEP (Data Execution Prevention) é a implementação no Windows. Combinado com ASLR para defesa em profundidade.' },

  { id:'so_052', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'ASLR — Address Space Layout Randomization',
    verso:'Randomiza os endereços base de código, pilha, heap e bibliotecas a cada execução. Dificulta exploits que dependem de endereços fixos (ROP attacks, buffer overflow). Implementado no kernel. Eficácia depende da quantidade de bits aleatorizados; sistemas 64-bit têm entropia muito maior que 32-bit.' },

  { id:'so_053', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Gerenciamento de Usuários Linux — sudo, su',
    verso:'root: superusuário com UID=0, acesso irrestrito.\nsu (switch user): muda para outro usuário (su - root abre shell root com ambiente completo).\nsudo: executa comando único como root (ou outro usuário) após autenticação. /etc/sudoers define quem pode usar sudo. Preferível ao root direto por auditoria e princípio do menor privilégio.' },

  { id:'so_054', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Cron e Agendamento de Tarefas',
    verso:'cron: daemon que executa comandos em horários agendados. Configurado via crontab (crontab -e). Formato: minuto hora dia-mês mês dia-semana comando. Ex: 0 2 * * 0 /backup.sh — todo domingo às 2h. /etc/cron.d/, cron.daily/weekly/monthly para scripts do sistema. systemd/timers é alternativa moderna.' },

  { id:'so_055', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Systemd — Unidades e Serviços',
    verso:'Systemd é o init moderno (PID 1) da maioria dos Linux. Unidades: .service (daemon), .socket, .timer, .mount, .target. Comandos: systemctl start/stop/restart/status/enable/disable. Journald centraliza logs (journalctl). Paraleliza inicialização por dependências, acelerando boot.' },

  { id:'so_056', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'Copy-on-Write (COW)',
    verso:'Otimização: ao fazer fork(), filho e pai compartilham as mesmas páginas marcadas como read-only. Ao tentar escrever, o kernel cria cópia privada da página (cópia ocorre sob demanda). Economiza memória e acelera fork(). Também usado em snapshots de sistemas de arquivos (ZFS, Btrfs, LVM thin provisioning).' },

  { id:'so_057', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Sinal SIGCHLD e Processo Zumbi',
    verso:'Quando um processo filho termina, ele permanece como zumbi (entrada na tabela de processos, status guardado) até o pai chamar wait()/waitpid() para coletar o status de saída. SIGCHLD é enviado ao pai no término do filho. Processo zumbi em excesso pode esgotar PIDs; aadoção pelo init/systemd evita o problema se o pai morrer.' },

  { id:'so_058', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Memória Compartilhada — shmget/mmap',
    verso:'Mecanismo IPC mais rápido: mapeia a mesma região de memória física no espaço de endereçamento de múltiplos processos. APIs: POSIX (shm_open + mmap) e System V (shmget/shmat). Requer sincronização explícita (semáforo/mutex) para evitar race conditions. mmap também serve para mapear arquivos em memória.' },

  { id:'so_059', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Gerenciamento de Pacotes Linux',
    verso:'Debian/Ubuntu: APT (apt install/remove/update/upgrade) + dpkg. Pacotes .deb.\nRHEL/CentOS/Fedora: DNF/YUM (dnf install) + rpm. Pacotes .rpm.\nArch Linux: pacman.\nSnap / Flatpak: pacotes universais com sandbox.\nRepositórios contêm metadados e índices; apt update atualiza o índice local.' },

  { id:'so_060', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Strace e Diagnóstico de Processos',
    verso:'strace: rastreia syscalls e sinais de um processo (strace -p PID ou strace comando). Útil para debugar onde um programa trava ou falha.\nlsof: lista arquivos abertos por processos.\nnetstat/ss: conexões de rede abertas.\n/proc/PID/: informações do processo (maps, fd, status, cmdline, environ).' },

  // ── Windows ───────────────────────────────────────────────────────────────
  { id:'so_061', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Registro do Windows',
    verso:'Banco de dados hierárquico que armazena configurações do SO e aplicações. Organizado em hives:\n• HKLM (Hardware, SO, drivers)\n• HKCU (configurações do usuário atual)\n• HKCR (associações de arquivos/COM)\n• HKU (todos os usuários)\n• HKCC (hardware atual)\nEditado com regedit.exe ou PowerShell.' },

  { id:'so_062', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Active Directory — AD',
    verso:'Serviço de diretório da Microsoft (protocolo LDAP + Kerberos). Organiza objetos (usuários, computadores, grupos, políticas) em domínios, árvores e florestas. GPO (Group Policy Object) aplica configurações em massa. DC (Domain Controller) autentica usuários. DNS é pré-requisito do AD.' },

  { id:'so_063', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Processo de Boot do Windows',
    verso:'UEFI/BIOS → Windows Boot Manager (bootmgfw.efi) → Windows Boot Loader (winload.efi) → Kernel (ntoskrnl.exe) → Session Manager (smss.exe) → winlogon.exe → LogonUI → Explorer.exe (shell). O arquivo de configuração de boot é o BCD (Boot Configuration Data), gerenciado com bcdedit.' },

  { id:'so_064', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Gerenciador de Tarefas e Processos Windows',
    verso:'Task Manager (taskmgr.exe): processos, desempenho, startup, serviços.\nProcess Explorer (Sysinternals): árvore de processos, handles, DLLs.\nPowerShell: Get-Process, Stop-Process, Start-Process.\nComandos: tasklist, taskkill /PID xxx /F.\nServicos: services.msc ou sc start/stop nome.' },

  { id:'so_065', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'UAC — User Account Control',
    verso:'Recurso do Windows Vista+ que limita privilégios de administrador. Ao executar ação privilegiada, exibe prompt para confirmação (admin) ou credenciais (usuário padrão). Reduz impacto de malware. Token dividido: admin tem token filtrado (usuário comum) e token elevado (admin). Configurável em Política de Segurança Local.' },

  // ── Mais tópicos ──────────────────────────────────────────────────────────
  { id:'so_066', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'Monitor (Construct de Sincronização)',
    verso:'Abstração de alto nível para sincronização: encapsula dados compartilhados e operações que neles operam, garantindo exclusão mútua automática. Apenas um thread executa dentro do monitor por vez. Variáveis de condição (wait/signal) permitem bloqueio condicional. Java usa synchronized/wait/notify como monitor.' },

  { id:'so_067', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Escalonamento de Tempo Real — EDF vs. RM',
    verso:'Rate Monotonic (RM): prioridade inversamente proporcional ao período. Ótimo para tarefas periódicas estáticas. Utilização máxima garantida ≈ 69%.\nEarliest Deadline First (EDF): maior prioridade para quem tem deadline mais próximo. Ótimo para SO preemptivo; utilização até 100%. Mais complexo de implementar.' },

  { id:'so_068', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Tipos de Kernel — Exokernel e Unikernel',
    verso:'Exokernel: expõe hardware diretamente às aplicações com mínima abstração. Aplicações gerenciam seus próprios recursos. Pesquisa MIT.\nUnikernel: aplica e SO compilados em único binário para VM especializada. Superfície de ataque mínima, boot rápido, alto desempenho. Ex: MirageOS, Unikraft. Usado em edge computing/IoT.' },

  { id:'so_069', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Sistema de Arquivos Distribuído — NFS e SMB',
    verso:'NFS (Network File System): protocolo Unix/Linux para compartilhar filesystems via rede. Stateless (NFSv3), stateful+melhorias (NFSv4). Configurado em /etc/exports.\nSMB (Server Message Block) / CIFS: protocolo Windows para compartilhamento de arquivos e impressoras. No Linux via Samba. Porta 445 (TCP). Usado no Active Directory.' },

  { id:'so_070', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Bit de Dirty e Write-Back em Cache',
    verso:'Em cache write-back, quando uma linha de cache é modificada, o dirty bit é setado. A memória não é atualizada imediatamente — apenas quando a linha é substituída ou em flush explícito. Mais eficiente que write-through (que escreve na RAM a cada modificação). Coerência de cache crítica em multiprocessadores.' },

  { id:'so_071', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Quota de Disco',
    verso:'Mecanismo para limitar espaço em disco por usuário ou grupo. No Linux (ext4, XFS): setquota, repquota, edquota. Define soft limit (aviso) e hard limit (bloqueio). Grace period permite ultrapassar soft limit por tempo definido. Importante em ambientes multiusuário para evitar que um usuário ocupe todo o disco.' },

  { id:'so_072', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Logical Volume Manager — LVM',
    verso:'Abstrai discos físicos em volumes lógicos flexíveis. Componentes: PV (Physical Volume, disco/partição), VG (Volume Group, pool de PVs), LV (Logical Volume, partição virtual). Permite redimensionar volumes online, snapshots, espelhamento e striping. Muito usado em servidores Linux.' },

  { id:'so_073', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'SELinux — Security-Enhanced Linux',
    verso:'Módulo de segurança do kernel Linux baseado em MAC (Mandatory Access Control). Define políticas de acesso a objetos (arquivos, processos, portas) independente do dono. Modos: enforcing (aplica política), permissive (aud somente), disabled. Usado em RHEL/CentOS. AppArmor é alternativa usada no Ubuntu.' },

  { id:'so_074', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'DAC vs. MAC vs. RBAC',
    verso:'DAC (Discretionary AC): dono do recurso define permissões. Unix rwx é DAC.\nMAC (Mandatory AC): política central define acesso; usuário não pode alterar. SELinux, sistemas militares.\nRBAC (Role-Based AC): permissões atribuídas a papéis, usuários atribuídos a papéis. Mais flexível para empresas. ABAC adiciona atributos contextuais.' },

  { id:'so_075', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'SSD vs. HDD — Impacto no SO',
    verso:'SSD (NAND Flash): sem partes móveis, acesso aleatório rápido (< 0,1 ms), sem necessidade de escalonamento de disco (noop/mq-deadline preferido). Trim (SATA) / Unmap (NVMe) informa blocos livres ao firmware. Escrita em blocos → write amplification.\nHDD: latência rotacional + seek time; beneficia de SSTF/SCAN.' },

  { id:'so_076', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Variáveis de Ambiente',
    verso:'Pares chave=valor disponíveis para processos e seus filhos. Configuradas em /etc/environment, /etc/profile, ~/.bashrc, ~/.bash_profile.\nComandos: env (lista), export VAR=valor, echo $VAR, unset VAR.\nVariáveis importantes: PATH (diretórios de binários), HOME, USER, SHELL, LANG, LD_LIBRARY_PATH.' },

  { id:'so_077', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Memória Swap — Partição vs. Arquivo',
    verso:'Swap é extensão da RAM em disco. Partição swap: alocada em disco, mais eficiente. Arquivo swap (swapfile): flexível, criado com dd + mkswap + swapon. swapon -s lista swap ativo. swappiness (0-100): controla tendência do kernel de usar swap. Valor 60 padrão; SSD+RAM grande → swappiness menor (10-20).' },

  { id:'so_078', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'Problema de Inversão de Prioridade',
    verso:'Thread de alta prioridade fica bloqueada aguardando recurso mantido por thread de baixa prioridade. Thread média pode preemptar a de baixa, bloqueando indiretamente a de alta. Solução: Herança de Prioridade (thread baixa herda prioridade da alta enquanto mantém o recurso) ou Teto de Prioridade. Famoso no Mars Pathfinder (1997).' },

  { id:'so_079', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Hot Plug e ACPI',
    verso:'ACPI (Advanced Configuration and Power Interface): padrão para gerenciamento de energia e configuração do hardware. Define estados de energia: S0 (ligado), S1-S3 (sleep), S4 (hibernate), S5 (soft off). Hot plug: inserção/remoção de dispositivos com sistema em funcionamento (USB, PCIe hot-plug, discos em servidor).' },

  { id:'so_080', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'SSH — Secure Shell',
    verso:'Protocolo de acesso remoto seguro (porta 22, TCP). Criptografia assimétrica para autenticação (par de chaves RSA/Ed25519) e simétrica para o canal (AES). Funcionalidades: terminal remoto, tunelamento de portas (port forwarding), transferência de arquivos (SCP, SFTP). ssh-keygen gera par de chaves; ssh-copy-id instala chave pública no servidor.' },

  { id:'so_081', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Logs do Sistema Linux — journald e syslog',
    verso:'syslog/rsyslog: serviço tradicional de logs. Arquivos em /var/log/ (syslog, auth.log, kern.log, nginx/access.log).\njournald (systemd): armazena logs binários indexados. journalctl -u serviço, -f (follow), --since/-until para filtrar. Logs persistentes em /var/log/journal/ (se configurado).' },

  { id:'so_082', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Firewall Linux — iptables e nftables',
    verso:'iptables: ferramenta para configurar netfilter (firewall do kernel Linux). Tabelas: filter (INPUT/OUTPUT/FORWARD), nat (PREROUTING/POSTROUTING), mangle. Regras: -A (append), -D (delete), -j ACCEPT/DROP/REJECT.\nnftables: substituto moderno do iptables, sintaxe unificada, melhor desempenho. ufw é frontend simples para iptables.' },

  { id:'so_083', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Compressão e Arquivamento — tar, gzip, bzip2',
    verso:'tar: empacota arquivos em .tar (sem compressão por si). Flags: -c (create), -x (extract), -v (verbose), -f (file), -z (gzip), -j (bzip2), -J (xz).\ngzip: compressão rápida, .tar.gz ou .tgz.\nbzip2: melhor compressão, mais lento, .tar.bz2.\nxz: melhor compressão ainda, mais lento, .tar.xz. zip/unzip: compatibilidade Windows.' },

  { id:'so_084', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Comandos de Rede Linux',
    verso:'ip addr: endereços de interfaces (substitui ifconfig).\nip route: tabela de roteamento.\nss: sockets abertos (substitui netstat). ss -tulpn mostra portas em escuta.\nnmap: scanner de portas.\ncurl/wget: clientes HTTP.\ndig/nslookup: consultas DNS.\nping: ICMP echo.\ntraceroute/tracepath: rastreia rota de pacotes.' },

  { id:'so_085', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Wsl — Windows Subsystem for Linux',
    verso:'Compatibilidade do Linux dentro do Windows. WSL1: traduz syscalls Linux para Windows em tempo real. WSL2: kernel Linux real em VM leve (Hyper-V), melhor compatibilidade e desempenho de filesystem. Suporta distribuições da MS Store (Ubuntu, Debian, Kali). Integração com VS Code, Docker Desktop.' },

  { id:'so_086', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Controle de Versão do Kernel Linux',
    verso:'Formato: major.minor.patch (ex: 6.8.2). Versões LTS (Long-Term Support) recebem correções por vários anos. Kernel.org publica versões estáveis e de desenvolvimento. Distribuições aplicam patches adicionais. lsmod lista módulos carregados; modprobe carrega/descarrega módulos; dmesg mostra mensagens do kernel.' },

  { id:'so_087', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'NUMA — Non-Uniform Memory Access',
    verso:'Arquitetura multiprocessador onde cada CPU tem memória local (acesso rápido) e pode acessar memória remota (outro nó, acesso mais lento). O SO deve alocar memória no nó do CPU que vai usá-la. numactl controla afinidade. NUMA-aware applications têm melhor desempenho. Alternativa: UMA (acesso uniforme).' },

  { id:'so_088', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Comando find no Linux',
    verso:'Busca arquivos/diretórios por critérios. Exemplos:\nfind / -name "*.log" -type f → arquivos .log\nfind /home -user joao -mtime -7 → modificados nos últimos 7 dias\nfind . -size +100M → maiores que 100 MB\nfind . -perm 777 → permissão 777\n-exec {} ; executa comando em cada resultado.' },

  { id:'so_089', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Grep, Sed e Awk',
    verso:'grep: busca padrão em texto. grep -r "erro" /var/log, -i (case-insensitive), -v (inverte).\nsed (stream editor): transforma texto. sed "s/old/new/g" — substituição global; sed -i edita o arquivo.\nawk: processa campos. awk \'{print $1, $3}\' imprime colunas 1 e 3. Suporta condições, loops e funções.' },

  { id:'so_090', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Sistemas de Arquivos ZFS e Btrfs',
    verso:'ZFS (originalmente Sun/Solaris): suporta RAID-Z, snapshots, checksums de integridade, compressão inline, deduplicação, pool de armazenamento. Praticamente inquebrável quanto à corrupção de dados.\nBtrfs (Linux nativo): COW, snapshots, RAID 0/1/10/5/6, subvolumes. Alternativa moderna ao ext4 com recursos avançados.' },

  { id:'so_091', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Bootloader GRUB 2',
    verso:'GRand Unified Bootloader versão 2. Arquivo de config: /boot/grub/grub.cfg (gerado por grub-mkconfig). Scripts em /etc/grub.d/ e configurações em /etc/default/grub. Suporta múltiplos SOs (dual boot), scripts de inicialização, kernel parameters. grub-install instala o bootloader no MBR/ESP.' },

  { id:'so_092', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Monitoramento com vmstat e iostat',
    verso:'vmstat [intervalo]: relatório de memória virtual, processos, operações de I/O de bloco, CPU (us, sy, id, wa). wa alto = gargalo de I/O.\niostat -x [intervalo]: estatísticas detalhadas por dispositivo (await = latência média, %util = ocupação). Parte do pacote sysstat. Útil para diagnosticar thrashing e gargalos de disco.' },

  { id:'so_093', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'Huge Pages — THP',
    verso:'Páginas de memória grandes (2 MB ou 1 GB) em vez das padrão (4 KB). Reduzem entradas na TLB e TLB misses em aplicações com grandes conjuntos de dados (bancos de dados, VMs). Transparent Huge Pages (THP): kernel agrupa/divide automaticamente. HugeTLBfs: alocação manual. Bancos de dados como Oracle recomendam desativar THP.' },

  { id:'so_094', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'OOM Killer no Linux',
    verso:'Out-Of-Memory Killer: mecanismo do kernel que termina processos quando a memória está esgotada e o swap também. Seleciona o processo com maior "oom_score" (combina tamanho de memória e outros fatores). oom_score_adj (-1000 a 1000) permite ajustar prioridade de terminação. Mensagem no dmesg: "Out of memory: Kill process".' },

  { id:'so_095', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Acl — Access Control List estendida',
    verso:'Extensão do modelo de permissões Unix que permite permissões por usuário/grupo específico além de dono/grupo/outros. setfacl -m u:joao:rwx arquivo adiciona ACL. getfacl arquivo mostra as ACLs. Sinal + no ls -l indica ACL presente. Suportado por ext4, XFS, Btrfs, NTFS nativo.' },

  { id:'so_096', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Auditoria com auditd no Linux',
    verso:'auditd: daemon de auditoria do kernel Linux. Registra syscalls, acessos a arquivos e eventos de segurança. Configurado via /etc/audit/auditd.conf e regras em /etc/audit/rules.d/. auditctl -w /etc/passwd -p wa -k passwd_changes → monitora leituras/escritas no /etc/passwd. ausearch e aureport para análise.' },

  { id:'so_097', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Kernel Parameters — sysctl',
    verso:'sysctl ajusta parâmetros do kernel em tempo de execução (via /proc/sys/). Exemplos:\nsysctl -w net.ipv4.ip_forward=1 → habilita roteamento\nvm.swappiness=10 → reduz uso de swap\nnet.core.somaxconn=1024 → fila de conexões TCP\nPersistência em /etc/sysctl.conf ou /etc/sysctl.d/. sysctl -a lista todos os parâmetros.' },

  { id:'so_098', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Fácil',
    frente:'Tipos de Shell — bash, zsh, sh',
    verso:'sh (Bourne Shell): shell original POSIX, disponível em todo Unix/Linux.\nbash (Bourne Again Shell): extensão do sh, padrão em maioria dos Linux. Recursos: arrays, aritmética, brace expansion, history.\nzsh: poderoso, compatível com bash, com autocompletion avançada, plugins (Oh-My-Zsh). Padrão no macOS.\nfish: amigável, interativo, não compatível com POSIX.' },

  { id:'so_099', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Tipos de Memória — Stack vs. Heap',
    verso:'Stack (pilha): alocação estática/automática. Cresce para baixo. Armazena variáveis locais, parâmetros, endereços de retorno. LIFO, gerenciado pelo compilador. Tamanho limitado (tipicamente 1-8 MB). Stack overflow: recursão infinita ou variáveis locais gigantes.\nHeap: alocação dinâmica (malloc/new). Gerenciada pelo programador. Fragmentação possível. Sem limite fixo.' },

  { id:'so_100', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'GPT vs. MBR — Tabelas de Partição',
    verso:'MBR (Master Boot Record): limite de 4 partições primárias (ou 3+1 estendida), volumes até 2 TB. Código de boot nos primeiros 512 bytes.\nGPT (GUID Partition Table): parte do padrão UEFI. Até 128 partições, volumes até 9,4 ZB, CRC32 para integridade, backup da tabela no final do disco. Requesito para Windows 11 + Secure Boot.' },

  // ── Questões de Concurso ──────────────────────────────────────────────────
  { id:'so_101', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'eBPF — Extended Berkeley Packet Filter',
    verso:'Tecnologia do kernel Linux que permite executar programas sandboxed no espaço do kernel sem módulos de kernel. O verificador (verifier) garante segurança e terminação. Casos de uso: tracing/observabilidade (Cilium, bpftrace), networking (XDP — bypass do stack TCP/IP, ~100ns latência), segurança (Falco, Tetragon — políticas em runtime). "Linux superpower" moderno.' },

  { id:'so_102', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Linux — Capabilities',
    verso:'Dividem os privilégios root em unidades menores. Em vez de dar root completo, processo recebe apenas as capabilities necessárias.\nExemplos: CAP_NET_BIND_SERVICE (bind em porta < 1024), CAP_SYS_ADMIN (operações administrativas), CAP_NET_RAW (raw sockets), CAP_SYS_PTRACE (depuração).\nImportante para containers (Docker/Kubernetes limitam capabilities por padrão). Princípio do menor privilégio no SO.' },

  { id:'so_103', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'NUMA — Non-Uniform Memory Access',
    verso:'Arquitetura onde o tempo de acesso à memória varia dependendo de qual processador (node) solicita qual memória. Memória local (no mesmo node) é mais rápida que remota (cross-node via interconexão). Linux expõe via numactl. Aplicações NUMA-aware alocam memória no mesmo node da CPU que vai usá-la (memory affinity). Crítico para performance em servidores multi-socket.' },

  { id:'so_104', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Systemd — Unit Files e Targets',
    verso:'Unidade básica: arquivo .service, .timer, .socket, .mount, .target.\nSeções de um .service: [Unit] (descrição, dependências After=/Requires=), [Service] (Type=, ExecStart=, Restart=, User=), [Install] (WantedBy=multi-user.target).\nComandos: systemctl start/stop/restart/enabled/disable/status.\nJournald: log unificado; journalctl -u serviço -f.\nCobrado: "systemctl mask" diferente de "disable" (mask bloqueia ativação).' },

  { id:'so_105', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Escalonamento CFS — Completely Fair Scheduler',
    verso:'Escalonador padrão do Linux desde o kernel 2.6.23. Não usa timeslices fixos: cada processo tem um "virtual runtime" (vruntime). O processo com menor vruntime é escolhido (runqueue implementada como BST/red-black tree). Garante justiça proporcional ao peso (nice value). Grupos de controle (cgroups) permitem limitar CPU por grupo de processos.' },

  { id:'so_106', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'Copy-on-Write (COW) em fork()',
    verso:'Após fork(), pai e filho compartilham as mesmas páginas físicas mapeadas como somente-leitura. Quando qualquer um tenta escrever em uma página, o kernel copia a página apenas para o processo que escreveu (page fault → cópia). Resultado: fork() é O(1) em vez de O(n) — copia apenas o que foi modificado. Usado em shells, Redis (RDB snapshot), PostgreSQL (MVCC).' },

  { id:'so_107', banca:'IBFC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Huge Pages (Páginas Gigantes)',
    verso:'Páginas de memória maiores que o padrão (4 KB): 2 MB (huge pages) ou 1 GB (gigantic pages) no x86-64. Reduzem TLB misses em workloads com grande consumo de memória (bancos de dados, ML). Dois tipos no Linux: transparent huge pages (THP — automático) e HugeTLBfs (alocação explícita, mais previsível). JVM, Oracle DB e PostgreSQL se beneficiam de huge pages.' },

  { id:'so_108', banca:'FCC', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Comandos Linux — Diagnóstico de Performance',
    verso:'vmstat: CPU, memória, I/O e swap em intervalos.\niostat: utilização de discos e dispositivos de bloco.\nsar (sysstat): coleta histórica de CPU, memória, rede, I/O.\nfree -h: uso de memória e swap.\nlsof: lista arquivos abertos por processos.\nstrace: rastreia syscalls de um processo.\nperf: profiling de CPU com eventos de hardware (ciclos, cache misses).\nulimit: limites de recursos por processo (arquivos, memória, CPU).' },

  { id:'so_109', banca:'Cebraspe', materia:'Sistemas Operacionais', dificuldade:'Difícil',
    frente:'Segurança no Linux — AppArmor e SELinux',
    verso:'Mecanismos de MAC (Mandatory Access Control) no Linux:\n• SELinux (Security-Enhanced Linux — NSA): usado no RHEL/CentOS/Fedora. Labels em todos os objetos. Política complexa mas granular. Modos: enforcing, permissive, disabled.\n• AppArmor: Ubuntu/Debian. Perfis por programa (pathname-based), mais simples. Modos: enforce, complain.\nAmbos implementam o modelo MAC na camada LSM (Linux Security Module) do kernel.' },

  { id:'so_110', banca:'FGV', materia:'Sistemas Operacionais', dificuldade:'Médio',
    frente:'Kubernetes — Conceitos Fundamentais',
    verso:'Orquestrador de containers. Componentes:\n• Pod: menor unidade deployável, um ou mais containers com IP e storage compartilhados.\n• Node: máquina (física ou VM) que executa Pods.\n• Control Plane: API Server, etcd (estado do cluster), Scheduler, Controller Manager.\n• Service: abstração de rede que expõe um conjunto de Pods (ClusterIP, NodePort, LoadBalancer).\n• Namespace: isolamento lógico de recursos.\nProbe de saúde: liveness e readiness.' },
];
