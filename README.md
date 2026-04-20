# Sistemi i Menaxhimit të Kërkimeve Shkencore  UMIBRes

**Universiteti "Isa Boletini" në Mitrovicë**  
Sistemi i Menaxhimit të Kërkimeve Shkencore – Dokumenti i Specifikimeve  

---

## Overview

**RMS** është një aplikacion web që centralizon menaxhimin e aktiviteteve kërkimore në UIBM.  

Mundëson:
- Menaxhimin e botimeve shkencore
- Ndjekjen e projekteve kërkimore
- Përpunimin e kërkesave për përkrahje financiare
- Raportim institucional dhe për akreditim

---

## Problemi

UIBM nuk ka një sistem të unifikuar për:
- Menaxhimin e rezultateve kërkimore
- Përpunimin e kompensimeve/pagueshmeve
- Gjenerimin e raporteve për akreditim

Kjo krijon inefficiencë dhe fragmentim të të dhënave.

---

## Zgjidhje

Një sistem web i cili ofron:
- Portal për kërkuesit shkencorë
- Workflows për administrimin
- Modul financiar
- Dashboard analitik
- Integrim me ORCID, Scopus, CrossRef

---

## Objektivat

- Centralizimi i të dhënave kërkimore
- Përmirësimi i efikasitetit të punës
- Mbështetje për proceset e akreditimit
- Vendimmarrje e bazuar në të dhëna

---

## User Roles

- Researcher
- komisioni per vleresimin e veprimtarise shkencore 
- Admin
- keshilli drejtues
- Vice Rector

---

## Modulet

### 1. Portali i Kërkuesit
- Menaxhim profili
- Dorëzim publikimesh
- Ndjekje projekte
- Dashboard KPI

### 2. Administrimi i Kërkimeve
- Workflow shqyrtimi
- Menaxhim revista
- Verifikim compliance

### 3. Moduli Financiar
- Kërkesa për kompensim
- Approva multi-hapi
- Ndjekje buxheti

### 4. Raportim & Analitika
- Dashboard
- Ndjekje KPI
- Eksport raporte

### 5. Dashboard Strategjik
- Përmbledhje institucionale
- Krahasim fakultetesh

### 6. Njoftime
- Email dhe in-app alerts

---

## Teknologjitë

**Frontend**
- React.js (JavaScript)

**Backend**
- Node.js (Express.js / NestJS)

**Baza e të dhënave**
- MySQL

---

# RMS - Research Management System

Ky repository përmban kërkesat funksionale dhe jo-funksionale për sistemin **RMS** (Research Management System) të Universitetit.

---

# RMS - Kërkesat Funksionale

Sistemi i Menaxhimit të Kërkimeve Shkencore (RMS) është i organizuar në 6 module kryesore, secili duke adresuar një fushë funksionale specifike. Çdo kërkesë ka një ID unike për gjurmueshmëri.

---

## 3.1 Moduli A: Portali i Kërkuesit

Portali i Kërkuesit është ndërfaqja kryesore për stafin akademik për menaxhimin e profilit kërkimor, dorëzimin e punimeve dhe monitorimin e performancës.

### 3.1.1 Menaxhimi i Profilit
| ID | Kërkesa | Prioritet |
|----|---------|-----------|
| RP-001 | Kërkuesit të krijojnë dhe menaxhojnë profilin akademik: emër, titull, departament, fakultet, ORCID ID, Scopus Author ID, Google Scholar URL, dhe kontakt | Must |
| RP-002 | Sistemi të gjenerojë automatikisht CV-në akademike nga të dhënat e profilit, eksportueshme si PDF | Should |
| RP-003 | Profili të shfaqë kronologjinë e aktiviteteve kërkimore: dorëzime, aprovim, dhe rimbursime | Must |
| RP-004 | Kërkuesit të ngarkojnë foto profili dhe detaje të afiliacionit institucional | Could |
| RP-005 | Sistemi të tërheqë të dhëna nga ORCID dhe Scopus për para-popullimin e profilit (me konfirmim të kërkuesit) | Should |

### 3.1.2 Dorëzimi i Publikimeve
| ID | Kërkesa | Prioritet |
|----|---------|-----------|
| RP-010 | Kërkuesit të dorëzojnë publikime me: titull, autorë + afiliacion, revistë/konferencë, DOI, datë publikimi, volum/fqinjë, lloj publikimi | Must |
| RP-011 | Sistemi të validrojë DOI dhe të përpiqet të plotësojë metadata nga CrossRef | Should |
| RP-012 | Kërkuesit të ngarkojnë dokumentacion dëshmues (PDF, letër pranimi, screenshot botues) | Must |
| RP-013 | Sistemi të klasifikojë automatikisht rangun e revistës (Q1-Q4) | Must |
| RP-014 | Kërkuesit të tregojnë nëse publikimi përfshin afiliacion me UIBM | Must |
| RP-015 | Sistemi të zbulojë dorëzime të dyfishta (DOI ose titull + vit i njëjtë) | Should |

### 3.1.3 Monitorimi i Projekteve Kërkimore
| ID | Kërkesa | Prioritet |
|----|---------|-----------|
| RP-020 | Kërkuesit të regjistrojnë projekte kërkimore me: titull, burim financimi, shumën e grantit, datat fillimi/mbarimi, anëtarët e ekipit, status | Must |
| RP-021 | Projektet të lidhen me publikimet dhe prezantimet e konferencës | Should |
| RP-022 | Sistemi të ndjekë milestones dhe deliverables të projekteve | Could |

### 3.1.4 Dashboard KPI (Pamja e Kërkuesit)
| ID | Kërkesa | Prioritet |
|----|---------|-----------|
| RP-030 | Çdo kërkues të shohë dashboard personal me: numër publikimesh/vit, publikime sipas llojit, citime (nëse integruar), h-index (nëse i disponueshëm), projekte aktive, kërkesa rimbursimi në pritje | Must |
| RP-031 | Dashboard të tregojë krahasimin me mesataret e departamentit/fakultetit (anonymized) | Should |
| RP-032 | Kërkuesit të vendosin objektiva vjetore kërkimore dhe të ndjekin progresin | Could |

---

## 3.2 Moduli B: Administrimi i Kërkimeve

Ky modul lejon Zyrën e Kërkimeve të shqyrtojë, verifikojë, kategorizojë dhe aprovojë dorëzimet.

### 3.2.1 Workflow për Shqyrtimin e Dorëzimeve
| ID | Kërkesa | Prioritet |
|----|---------|-----------|
| RA-001 | Stafi të shikojë të gjitha dorëzimet në pritje, të radhitura sipas date, fakulteti, lloj dhe status | Must |
| RA-002 | Shqyrtuesit të aprovojnë, refuzojnë ose kthejnë për rishikim me komente | Must |
| RA-003 | Sistemi të sigurojë shqyrtimin brenda SLA të konfigurueshëm (default: 10 ditë pune) | Should |
| RA-004 | Shqyrtuesit të mund të editojnë metadata gjatë shqyrtimit | Must |
| RA-005 | Sistemi të ruajë të gjitha veprimet e shqyrtimit për auditim | Must |

### 3.2.2 Kategorizimi dhe Compliance
| ID | Kërkesa | Prioritet |
|----|---------|-----------|
| RA-010 | Sistemi të mbajë bazën e revistave: ISSN, emër, botues, kvartil Scopus, kategori Web of Science, status CEEOL, flag predatory | Must |
| RA-011 | Zyrë të menaxhojë bazën e revistave (shto, redakto, import CSV, flag predatory) | Must |
| RA-012 | Sistemi të shënjojë automatikisht dorëzimet në revista jo të aprovuara | Should |
| RA-013 | Operacione bulk: aprovoj/refuzoj shumë dorëzime, eksport të dhëna të filtruar, ridrejto shqyrtues | Should |
| RA-014 | Sistemi të kontrollojë compliance me politikat institucionale (afiliacion UIBM, kontribut minimal autorësh) | Must |

---

## 3.3 Moduli C: Mbështetje Financiare dhe Rimbursime

Ky modul menaxhon kërkesat për rimbursim, nga dorëzimi tek pagesa, sipas rregullores së UIBM.

### 3.3.1 Dorëzimi i Kërkesave
| ID | Kërkesa | Prioritet |
|----|---------|-----------|
| FR-001 | Kërkuesit të dorëzojnë kërkesa rimbursimi të lidhura me publikime/konferenca të aprovuara | Must |
| FR-002 | Formulari të kapë: lloj, shumën EUR, dokumente mbështetëse, output i lidhur | Must |
| FR-003 | Sistemi të zbatojë rregulla eligjibiliteti (publikime minimum kriter, ex: Scopus) | Must |
| FR-004 | Dokumente të detyrueshme: proof of publication, invoice, bank details | Must |
| FR-005 | Sistemi të llogarisë shumën maksimale të rimbursueshme sipas rregullave | Must |

### 3.3.2 Workflow Multi-Hapëshe
| ID | Kërkesa | Prioritet |
|----|---------|-----------|
| FR-010 | Kërkesat të ndjekin workflow multi-hapëshe: Koordinator → Zyra Kërkimeve → Finance | Must |
| FR-011 | Çdo aprovues të aprovojë/refuzojë/kthe me komente të detyrueshme | Must |
| FR-012 | Sistemi të dërgojë njoftime automatike në çdo ndryshim statusi | Must |
| FR-013 | Escalation: nëse nuk aprovohet brenda SLA, njoftime dhe escalim | Should |
| FR-014 | Sistemi të parandalojë aprovime mbi buxhetin e mbetur | Must |

### 3.3.3 Monitorimi i Buxhetit
| ID | Kërkesa | Prioritet |
|----|---------|-----------|
| FR-020 | Sistemi të ndjekë alokimin vjetor të buxhetit per fakultet/departament | Must |
| FR-021 | Dashboard në kohë reale: total, të angazhuar, të shpenzuar, të mbetur | Must |
| FR-022 | Alarme buxheti: 75%, 90%, 100% | Should |
| FR-023 | Finance Office të futë/ndryshojë alokimet vjetore | Must |

---

## 3.4 Moduli D: Raportim dhe Analitika
| ID | Kërkesa | Prioritet |
|----|---------|-----------|
| RE-001 | Dashboards me: publikime sipas lloj/vit, fakultet, financim, status rimbursimi | Must |
| RE-002 | Analiza trend: krahasim vjet pas viti, citime, përdorim fondesh | Should |
| RE-003 | Raporte eksportueshme PDF/Excel për akreditim | Must |
| RE-004 | Templates parapërgatitura: raport vjetor, performance fakulteti, eksport akreditim, summary financiar | Must |
| RE-005 | Custom report builder me filters | Should |
| RE-006 | Raporte të planifikuara (mujor/çerek/vjetor) me email | Could |

---

## 3.5 Moduli E: Dashboard Strategjik Zëvendës Rektor
| ID | Kërkesa | Prioritet |
|----|---------|-----------|
| VR-001 | Dashboard institucional: total publikime, projekte aktive, fondi total, përdorim buxheti | Must |
| VR-002 | Krahasim fakultetesh: metrics performancë | Must |
| VR-003 | Ranking kërkuesish sipas kriteresh të konfigurueshme | Should |
| VR-004 | Alerts për fusha nënperformuese | Should |
| VR-005 | Monitorim KPI strategjik | Must |
| VR-006 | Insight për alokim fondesh | Could |

---

## 3.6 Moduli F: Njoftime dhe Komunikim
| ID | Kërkesa | Prioritet |
|----|---------|-----------|
| NT-001 | Njoftime automatike email: dorëzim, aprovime/refuzime, status rimbursimi, reminders | Must |
| NT-002 | In-app notification center me status read/unread dhe histori | Must |
| NT-003 | Preferenca configurable njoftimesh per përdorues | Should |
| NT-004 | Batch notifications për Zyrën e Kërkimeve: daily digest | Should |
| NT-005 | Njoftime sistem-wide nga admin (call for proposals, deadlines) | Should |

---

## 2️⃣ Kërkesat Jo-Funksionale

### **Security**
| ID | Kërkesë | Prioritet |
|----|---------|-----------|
| NF-001 | RBAC me 6 role dhe permissions modulare | Must |
| NF-002 | Authentication SSO/LDAP/SAML | Must |
| NF-003 | TLS 1.2+ & AES-256 për të dhëna | Must |
| NF-004 | Timeout pas 30 min inactivity | Must |
| NF-005 | Compliance me Ligjin për Mbrojtjen e të Dhënave Personale | Must |
| NF-006 | 2FA për role administrative | Should |

### **Performance**
| ID | Kërkesë | Prioritet |
|----|---------|-----------|
| NF-010 | Dashboard load <3s për 500 users | Must |
| NF-011 | Search queries <2s | Must |
| NF-012 | Report generation <30s | Should |
| NF-013 | Horizontal scaling për 1000+ users | Should |

### **Usability**
- Intuitive UI, guided form wizards, consistent navigation  
- WCAG 2.1 AA compliance  
- Responsive për desktop/tablet/mobile  

### **Auditability**
- Audit log i plotë, immutable, eksportable për auditues  
- Versioning i të dhënave  

### **Availability & Reliability**
- 99.5% uptime  
- Backups me 30-day retention  
- Disaster recovery (RTO=4h, RPO=1h)  
- Graceful degradation  

### **Localization**
- Bilingual Albanian/English  
- Format datash DD.MM.YYYY  
- Currency EUR

---
## 3️⃣ User Stories

### Role: Researcher
- Si një kërkues, dua të krijoj dhe menaxhoj profilin tim akademik, që të shfaq kompetencat dhe publikimet e mia.
- Si një kërkues, dua të dorëzoj publikime shkencore online, që të jenë të regjistruara dhe të gjurmueshme.
- Si një kërkues, dua të ndjek progresin e projekteve që kam, që të di statusin e tyre në çdo kohë.
- Si një kërkues, dua të marr njoftime për afatet e dorëzimeve ose aprovimeve, që të mos humbas asnjë aktivitet.

### Role: Coordinator
- Si koordinator, dua të shqyrtoj publikimet e stafit tim, që të siguroj compliance me standardet akademike.
- Si koordinator, dua të aprovoj kërkesat financiare për projekte të stafit, që të mund të menaxhoj buxhetin e departamentit.
- Si koordinator, dua të shoh raporte për aktivitetet kërkimore të departamentit, që të mund të planifikoj strategjinë.

### Role: Research Office Staff
- Si staf administrativ, dua të menaxhoj të gjitha dorëzimet dhe projektet, që të siguroj që proceset të jenë të rregullta.
- Si staf administrativ, dua të gjeneroj raporte për akreditim, që të përmbushim kërkesat ligjore dhe institucionale.
- Si staf administrativ, dua të kontrolloj duplikimet dhe metadata e publikimeve, që të shmang gabimet.

### Role: Financial Officer
- Si punonjës financiar, dua të shqyrtoj dhe aprovoj kërkesat për kompensime, që të menaxhoj pagesat në kohë.
- Si punonjës financiar, dua të ndjek buxhetin e projekteve, që të siguroj transparencë dhe planifikim të saktë.

### Role: Vice Rector
- Si zëvendës rektor, dua të shoh dashboard strategjik me KPI dhe aktivitete të gjithë universitetit, që të marr vendime të informuara.

### Role: System Administrator
- Si administrator, dua të menaxhoj përdoruesit dhe rolet e tyre, që të siguroj kontroll dhe siguri në sistem.
- Si administrator, dua të monitoroj audit logs dhe aktivitetet e përdoruesve, që të garantoj integritetin e të dhënave.

  ---
  # Sistemi i Menaxhimit të Kërkimeve UIBM - Rastet e Përdoruesve

## 1️⃣ Researcher

### UC-01: Menaxho Profilin Akademik
- **Qëllimi:** Krijimi dhe menaxhimi i profilit akademik
- **Hapat Kryesorë:**
  1. Hyr në portal
  2. Redakto profilin: shto informacion personal, akademik dhe lidhje me institucione
  3. Ngarko foto profili
  4. Sinkronizo të dhënat nga ORCID/Scopus
- **Rezultati:** Profili i përditësuar, CV automatikisht e gjeneruar, shfaqet kronologjia e aktiviteteve

### UC-02: Dorëzo Publikim
- **Qëllimi:** Dorëzo një punim shkencor për monitorim dhe aprovimin
- **Hapat Kryesorë:**
  1. Hape formularin "Dorëzo Publikim"
  2. Plotëso titullin, autorët, revistën/konferencën, DOI, llojin, datat
  3. Ngarko dokumentin dëshmues (PDF, letër pranimi)
  4. Sistemi verifikon DOI, kontrollon dublikatet, klasifikon automatikisht nivelin e revistës
  5. Dorëzimi konfirmohet
- **Rezultati:** Publikimi regjistrohet dhe shfaqet në sistem; nis rrjedha e rishikimit

### UC-03: Monitoro Progresin e Projekteve
- **Qëllimi:** Ndiq statusin e projekteve kërkimore
- **Hapat Kryesorë:**
  1. Hyr te seksioni "Projektet e Mia"
  2. Shiko titullin e projektit, financimin, ekipin, objektivat, statusin
  3. Përditëso rezultatet ose ngarko raporte nëse kërkohet
- **Rezultati:** Statusi i projekteve i përditësuar dhe progresi i monitoruar

### UC-04: Merr Njoftime
- **Qëllimi:** Qëndro i informuar për afate, aprovime dhe përditësime të sistemit
- **Hapat Kryesorë:**
  1. Merr njoftime në aplikacion dhe email
  2. Hape njoftimin për të parë detajet
  3. Vepro nëse është e nevojshme (p.sh., rishiko dorëzimin)
- **Rezultati:** Kërkuesi i informuar për veprimet kritike dhe afatet

---

## 2️⃣ Koordinator i Departamentit

### UC-05: Aprovo Dorëzimet
- **Qëllimi:** Rishikimi i dorëzimeve të kërkuesve brenda departamentit
- **Hapat Kryesorë:**
  1. Hyr te radhitja e dorëzimeve të departamentit
  2. Aprovo, refuzo, ose kthe për rishikim
  3. Shto komente nëse refuzohet/kthehet
- **Rezultati:** Sigurohet përputhshmëria në nivel departamenti; rrjedha e punës vazhdon te Zyra e Kërkimeve

### UC-06: Aprovo Kërkesat për Rimbursim
- **Qëllimi:** Rishikimi dhe aprovimi i kërkesave financiare të kërkuesve
- **Hapat Kryesorë:**
  1. Hyr te radhitja e rimbursimeve
  2. Verifiko përputhshmërinë dhe disponueshmërinë e buxhetit
  3. Aprovo ose kthe për rishikim
- **Rezultati:** Menaxhimi i buxhetit; kërkesat i dërgohen më tej Zyrës së Kërkimeve

### UC-07: Monitoro Analitikën e Departamentit
- **Qëllimi:** Ndiq aktivitetin dhe performancën kërkimore
- **Hapat Kryesorë:**
  1. Hape panelin e departamentit
  2. Shiko dorëzimet, projektet, publikimet dhe metrikat financiare
- **Rezultati:** Menaxhim i bazuar në të dhëna i kërkimeve të departamentit

---

## 3️⃣ Stafi i Zyrës së Kërkimeve

### UC-08: Rishiko Rezultatet Kërkimore
- **Qëllimi:** Siguro që rezultatet kërkimore të plotësojnë standardet institucionale
- **Hapat Kryesorë:**
  1. Shiko të gjitha dorëzimet në pritje
  2. Aprovo, refuzo, ose kthe për korrigjim
  3. Redakto metadata nëse është e nevojshme
  4. Regjistro të gjitha veprimet për auditim
- **Rezultati:** Sigurohet përputhshmëria dhe raportimi i saktë

### UC-09: Menaxho Bazën e të Dhënave të Revistave
- **Qëllimi:** Mbaj listën e revistave të aprovuara
- **Hapat Kryesorë:**
  1. Shto, redakto ose importo revista
  2. Etiketo revista predatore
- **Rezultati:** Baza e revistave e përditësuar; dorëzimet kontrollohen automatikisht

### UC-10: Gjenero Raporte për Akreditim
- **Qëllimi:** Prodho raporte të përputhshme me AKA
- **Hapat Kryesorë:**
  1. Zgjidh periudhën e raportimit
  2. Gjenero template të plotësuar paraprakisht
  3. Rishiko, shëno dhe eksportoi si PDF/Excel
- **Rezultati:** Raportim institucional i saktë, gati për dorëzim

---

## 4️⃣ Punonjës Financiar

### UC-11: Proceso Rimbursimet
- **Qëllimi:** Aprovo dhe paguaj kërkesat financiare të vlefshme
- **Hapat Kryesorë:**
  1. Merr kërkesat e aprovuara nga Zyra e Kërkimeve
  2. Verifiko të dhënat bankare dhe buxhetin
  3. Proceso pagesën dhe përditëso sistemin
- **Rezultati:** Kërkuesi rimbursohet; paneli i buxhetit i përditësuar

### UC-12: Monitoro Buxhetin
- **Qëllimi:** Ndiq përdorimin e fondeve kërkimore
- **Hapat Kryesorë:**
  1. Hape panelin financiar
  2. Ndiq alokimin total, të angazhuar, të shpenzuar, të mbetur
  3. Merr alarme në nivelet e përcaktuara
- **Rezultati:** Menaxhim transparent dhe i kontrolluar i buxhetit

---

## 5️⃣ Zëvendës Rektor për Kërkime

### UC-13: Shiko Panelin Strategjik
- **Qëllimi:** Monitoro KPI-të kërkimore institucionale
- **Hapat Kryesorë:**
  1. Hape panelin institucional
  2. Rishiko publikimet, projektet, financimin, përdorimin e buxhetit
  3. Krahason performancën e fakulteteve
- **Rezultati:** Vendime strategjike të bazuara në të dhëna

---

## 6️⃣ Administrator Sistemi

### UC-14: Menaxho Përdoruesit dhe Roli
- **Qëllimi:** Kontrollo aksesin dhe rolet në sistem
- **Hapat Kryesorë:**
  1. Shto/hiq përdorues
  2. Cakto role dhe leje
  3. Monitoro log-et e auditimit
- **Rezultati:** Siguria dhe kontrolli i aksesit i garantuar

### UC-15: Monitoro Sistemin dhe Integrimet
- **Qëllimi:** Siguro besueshmërinë e sistemit dhe shëndetin e integrimeve
- **Hapat Kryesorë:**
  1. Ndiq uptime, backup-et dhe integrimet API
  2. Apliko përditësime konfigurimi sipas nevojës
- **Rezultati:** Operim stabil dhe i besueshëm i sistemit

  ---
  # RMS - Sprint Planning

Ky dokument përmban planifikimin e sprintave për Sistemin e Menaxhimit të Kërkimeve Shkencore (RMS) të UIBM.

| Sprint | Qëllimi | Module/UC | Tasks Kryesore | Output |
|--------|---------|-----------|----------------|--------|
| 1 | Setup Bazik & User Authentication | RBAC, Auth | - Setup projekti React + TypeScript<br>- Setup Node.js + Express/NestJS<br>- Config MySQL Database<br>- Implement RBAC me 6 role<br>- Login/Logout & TLS 1.2+ setup<br>- Test flows | Sistemi bazik me role dhe autentikim funksional |
| 2 | Researcher Portal - Profile Management | UC-01 | - Krijimi dhe menaxhimi i profilit (RP-001)<br>- Gjenerim CV PDF (RP-002)<br>- Timeline aktivitete (RP-003)<br>- Upload foto (RP-004)<br>- Sync ORCID/Scopus (RP-005)<br>- Audit log për ndryshimet | Kërkuesit mund të krijojnë profile dhe të shohin historikun |
| 3 | Researcher Portal - Publication Submission | UC-02 | - Dorëzim publikimesh (RP-010 → RP-015)<br>- Validim DOI (RP-011)<br>- Kontroll duplikat (RP-015)<br>- Klasifikim Q1-Q4 (RP-013)<br>- Storage dokumente PDF<br>- Notifications | Kërkuesit dorëzojnë publikime me validim dhe klasifikim automatik |
| 4 | Project Tracking & Notifications | UC-03, UC-04 | - Monitoro progresin e projekteve<br>- CRUD projekte, status, financim, ekip<br>- In-app & email notifications<br>- Dashboard bazik për KPI<br>- Audit log | Kërkuesit shohin progresin e projekteve dhe marrin njoftime |
| 5 | Coordinator - Approval Workflows | UC-05 → UC-07 | - Aprovo/refuzo dorëzime<br>- Aprovo/refuzo kërkesa financiare<br>- Monitoro analitikën e departamentit<br>- Notifications<br>- Audit log | Workflow aprovimi dhe raportim bazik për departamentin |
| 6 | Research Office - Administrative Functions | UC-08 → UC-10 | - Rishiko rezultatet kërkimore<br>- Menaxho bazën e revistave<br>- Gjenero raporte për akreditim<br>- Export PDF/Excel<br>- Kontroll compliance | Zyra mund të menaxhojë të dhënat dhe të gjenerojë raporte |
| 7 | Financial Module | UC-11, UC-12 | - Proceso rimbursimet<br>- Monitoro buxhetin<br>- Notifications për pagesa dhe alarme buxheti<br>- Audit log | Menaxhim i rimbursimeve dhe buxhetit në kohë reale |
| 8 | Vice Rector Dashboard | UC-13 | - Panel strategjik institucional<br>- Aggregation projekte, publikime, financa<br>- Grafike krahasuese KPI<br>- Drill-down analytics<br>- Export data | Vendime strategjike të bazuara në të dhëna |
| 9 | System Admin & System Monitoring | UC-14, UC-15 | - Menaxho përdoruesit dhe rolet<br>- Monitoro sistemin & integrimet<br>- Alerts për downtime/backup<br>- 2FA për admin<br>- Audit log për aktivitet admin | Sistemi i sigurt dhe i monitoruar nga administrator |


