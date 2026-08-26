/* ============================================================
   丸暗記用の長文
   1本およそ500語。8本で単語帳・熟語帳の全320項目をちょうど網羅する。
     p1,p2 … TOEIC 600点レベル 80語
     p3,p4 … TOEIC 730点レベル 80語
     p5,p6 … TOEIC 860点レベル 80語
     p7,p8 … 句動詞・熟語 80項目
   items には「その英文で覚える40項目」を並べてある。
   ============================================================ */
window.VOCAB_PASSAGES = [

{
  id: 'p1',
  deckId: 'toeic600',
  title: 'Opening the New Branch',
  titleJa: '新しい支店を開く',
  scope: 'TOEIC 600点レベル ①',
  items: ['announce','apply','appointment','approve','arrange','assemble','assign','attach','attend','available','branch','brochure','budget','cancel','catalog','client','colleague','complaint','conference','confirm','contract','customer','deadline','delay','deliver','department','deposit','discount','display','employee','equipment','estimate','expense','facility','furniture','handle','headquarters','install','instruction','interview'],
  paras: [
    {
      en: 'Last spring the company decided to open a new branch in Osaka, and the headquarters in Tokyo assigned the project to my department. On the first Monday of April the director announced the plan at a short conference. She said the budget was smaller than usual, so every expense would be checked twice. Then she attached a two-page instruction sheet to the email and asked each employee to read it before the next meeting.',
      ja: '昨年の春、会社は大阪に新しい支店を開くことを決め、東京の本社はそのプロジェクトを私の部署に割り当てた。4月の第一月曜日、部長が短い会議でその計画を発表した。予算はいつもより少ないので、経費はすべて二重に確認することになると彼女は言った。そして2ページの説明書をメールに添付し、次の会議までに読んでおくよう従業員一人ひとりに求めた。'
    },
    {
      en: 'My first job was to arrange the schedule. I made an appointment with the building manager and asked him to confirm that the space was still available. He said the third floor was free, but the contract had to be signed before the end of the month. That was a hard deadline. I sent the draft to our lawyer, who approved it after two days, and we signed without any delay.',
      ja: '私の最初の仕事は日程を手配することだった。ビルの管理人と約束を取り付け、その区画がまだ空いているか確認してほしいと頼んだ。3階が空いているが、契約は月末までに結ぶ必要があるという。これは動かせない締め切りだった。私は草案を顧問弁護士に送り、彼は2日後にそれを承認し、私たちは遅れることなく署名した。'
    },
    {
      en: 'Next came the equipment and the furniture. I asked three suppliers for an estimate, compared the numbers, and chose the one that offered the biggest discount. The company delivered everything in two weeks. Two workers came to install the network, and my colleagues helped me assemble the desks and chairs. We put a small display of our products near the entrance, and I placed a catalog and a brochure on every table so that visitors could take one.',
      ja: '次は機材と家具だった。3社に見積もりを依頼し、金額を比べ、いちばん大きな割引を提示した会社を選んだ。その会社は2週間ですべてを配達してくれた。作業員2名がネットワークを設置しに来て、同僚たちが机と椅子の組み立てを手伝ってくれた。入口の近くに自社製品の小さな陳列棚を置き、来訪者が持ち帰れるよう、どのテーブルにもカタログとパンフレットを1部ずつ置いた。'
    },
    {
      en: 'Hiring took longer. We had to interview twelve people in three days. One candidate did not attend the second interview and did not cancel it either, so we simply crossed out his name. In the end we hired four people. Each of them had to apply online, deposit a copy of their ID with the office, and handle their own paperwork.',
      ja: '採用にはもっと時間がかかった。3日間で12人を面接しなければならなかった。ある候補者は二次面接に出席せず、取り消しの連絡もしなかったので、私たちは彼の名前に線を引いただけだった。最終的に4人を採用した。全員がオンラインで応募し、身分証の写しを事務所に預け、自分の書類手続きは自分で行う必要があった。'
    },
    {
      en: 'The branch opened in July. On the first day a client called with a complaint: the delivery address on the invoice was wrong. My colleague fixed it in ten minutes, and the customer thanked us. The facility is small, but it works well. Everyone who visits says it feels like a real office, not a temporary one.',
      ja: '支店は7月に開店した。初日、ある顧客から苦情の電話があった。請求書の配送先住所が間違っていたのだ。同僚が10分で直し、その客は私たちに礼を言った。この施設は小さいが、よく機能している。訪れる人はみな、仮の事務所ではなく本物の事務所のようだと言う。'
    },
    {
      en: 'By September the branch had settled into a routine. Every Monday the department manager arranged a short meeting, and each employee reported anything that could delay the week. We kept a simple rule: if a customer sends a complaint, someone must confirm receipt the same day. The catalog was reprinted in October because the old one still showed the previous discount. I also asked the supplier to deliver the paper directly to the office, which cut one expense from the budget. When a new client visits, we now offer coffee at the small table near the display, and we hand over a brochure with the branch address printed on the back.',
      ja: '9月までに支店は決まった流れに落ち着いた。毎週月曜、部署の責任者が短い会議を手配し、従業員一人ひとりがその週を遅らせかねない事柄を報告した。私たちは単純な規則を守った。顧客から苦情が届いたら、誰かがその日のうちに受領を確認する、というものだ。カタログは10月に刷り直した。古いものには以前の割引が載ったままだったからだ。私は用紙を事務所に直接配達してもらうよう業者に頼み、それで経費が1つ予算から減った。新しい顧客が訪れると、今では陳列棚の近くの小さなテーブルでコーヒーを出し、裏面に支店の住所を印刷したパンフレットを手渡している。'
    },
    {
      en: 'Looking back, the hardest part was not the equipment or the contract. It was learning whom to ask. In a large headquarters there is always someone whose job is to handle the problem in front of you; in a new office there is not. For the first two months every question came to me, and I answered most of them badly. Now the four people we interviewed in June answer them better than I did.',
      ja: '振り返ってみると、いちばん大変だったのは機材でも契約でもなかった。誰に尋ねればよいかを覚えることだった。大きな本社なら、目の前の問題に対処するのが仕事の人が必ずいる。新しい事務所にはいない。最初の2か月はあらゆる質問が私のところに来て、その大半にうまく答えられなかった。今では6月に面接した4人が、当時の私よりうまく答えている。'
    }
  ]
},

{
  id: 'p2',
  deckId: 'toeic600',
  title: 'The Warehouse Year',
  titleJa: '倉庫の一年',
  scope: 'TOEIC 600点レベル ②',
  items: ['invoice','issue','luggage','maintenance','manufacture','negotiate','notify','offer','order','package','paperwork','passenger','permit','postpone','promote','provide','purchase','receipt','recruit','refund','register','renew','replace','request','require','reserve','resume','retail','review','schedule','shipment','staff','submit','supervisor','supply','survey','transfer','vendor','warehouse','workshop'],
  paras: [
    {
      en: 'I work for a company that manufactures kitchen equipment and sells it through retail stores. Our warehouse is next to the factory, and the staff there provide support to every shop in the country. Last year my supervisor asked me to review the whole delivery schedule, because too many customers were waiting.',
      ja: '私は台所用機器を製造し、小売店を通じて販売している会社で働いている。倉庫は工場の隣にあり、そこの職員が全国のすべての店舗に支援を提供している。昨年、上司から配送スケジュール全体を見直すように言われた。待たされている顧客が多すぎたからだ。'
    },
    {
      en: 'The first issue was the paperwork. Every shipment needed an invoice, a receipt, and a permit for the driver. I asked our vendor to submit the documents online instead of by fax. They agreed, but they required two months to change their system, so we had to postpone the new rule until June.',
      ja: '最初の問題は書類作業だった。すべての発送に請求書、領収書、そして運転手の許可証が必要だった。私は取引業者に、ファクスではなくオンラインで書類を提出してほしいと頼んだ。先方は同意したが、システムの変更に2か月を要するというので、新しい規則は6月まで延期しなければならなかった。'
    },
    {
      en: 'Then I negotiated with the transport company. They offered a lower price if we ordered more than fifty packages a week. I ran a small survey among the shops and found that they could easily purchase in larger amounts. We signed, and I notified every store by email.',
      ja: 'それから運送会社と交渉した。週に50個を超える小包を注文するなら、より安い価格を提示するという。私は店舗を対象に小さなアンケートを実施し、各店が難なくまとめて購入できることが分かった。私たちは契約し、私は全店舗にメールで通知した。'
    },
    {
      en: 'In autumn we decided to recruit three new people. Each applicant had to register on our website and send a resume. We held a two-day workshop for the ones we hired, so that they could learn how to supply the shops correctly and how to replace a damaged item without a long request form.',
      ja: '秋には3名を新たに採用することにした。応募者は自社サイトで登録し、履歴書を送る必要があった。採用した人たちのために2日間の研修を開き、店舗へ正しく商品を供給する方法と、長い申請書なしで破損品を交換する方法を学べるようにした。'
    },
    {
      en: 'In November I had to transfer to the Osaka office for a week. At the airport a passenger in front of me lost her luggage, and I remembered that our own boxes travel the same way. I decided to reserve a fixed slot with the airline every Monday.',
      ja: '11月には1週間、大阪の事務所に異動しなければならなかった。空港で私の前にいた乗客が手荷物を紛失し、自社の荷物も同じ経路を通っているのだと思い出した。私は毎週月曜に航空会社の枠を固定で予約することにした。'
    },
    {
      en: 'The results were good. Complaints about late delivery fell by half, and only two customers asked for a refund. The machines in the warehouse now get maintenance every three months, and we renew the service contract each spring. In April my supervisor promoted me to team leader.',
      ja: '結果は良好だった。配送の遅れに関する苦情は半分に減り、返金を求めた顧客は2人だけだった。倉庫の機械は今では3か月ごとに整備を受けており、保守契約は毎年春に更新している。4月、上司は私をチームリーダーに昇進させた。'
    },
    {
      en: 'The new system was not perfect. In February a shipment of ovens arrived with the wrong invoice, and the retail shop in Nagoya refused to accept it. I had to notify the vendor, request a corrected document, and reserve space in the warehouse until the paperwork was fixed. It took nine days. My supervisor said the delay was acceptable, but I did not think so, and I wrote a short report about it.',
      ja: '新しい仕組みは完璧ではなかった。2月、オーブンの発送分が誤った請求書とともに届き、名古屋の小売店が受け取りを拒んだ。私は取引業者に通知し、訂正した書類を依頼し、書類が整うまで倉庫に置き場所を確保しなければならなかった。9日かかった。上司はその遅れは許容範囲だと言ったが、私はそうは思わず、それについて短い報告書を書いた。'
    },
    {
      en: 'This year we will manufacture a smaller model, and the schedule is already full. I have been asked to review the packaging as well, because each package is heavier than it needs to be. If we can replace the wooden frame with cardboard, the staff will lift fewer heavy boxes and the transport company may offer us a better rate. I plan to submit the proposal before the end of March, and to run another survey once the new boxes are in the shops.',
      ja: '今年はより小さな型を製造することになっており、予定はすでに埋まっている。私は梱包の見直しも頼まれた。小包1つひとつが必要以上に重いからだ。木枠を段ボールに取り替えられれば、職員が持ち上げる重い箱は減り、運送会社もより良い料金を提示してくれるかもしれない。3月末までに提案書を提出し、新しい箱が店に行き渡ったらもう一度アンケートを実施するつもりだ。'
    },
    {
      en: 'One more change is coming. From next April every invoice will carry a code that links it to the original order, so the staff in the warehouse will no longer have to search through a folder of paper. My supervisor asked me to write the instructions and to hold a short workshop for the shops before the system goes live. I have already reserved the room.',
      ja: 'もう1つ変更が控えている。来年4月から、請求書には元の注文と結びつくコードが載るようになり、倉庫の職員が紙の綴りを探し回る必要はなくなる。上司からは、手順書を書き、稼働前に店舗向けの短い研修会を開くよう頼まれた。部屋はもう予約してある。'
    }
  ]
},

{
  id: 'p3',
  deckId: 'toeic730',
  title: 'Expanding the Hotel',
  titleJa: 'ホテルを増築する',
  scope: 'TOEIC 730点レベル ①',
  items: ['accommodate','adjacent','affordable','alternative','anticipate','appropriate','approximately','assess','authorize','beneficial','collaborate','commence','competitive','complimentary','comply','comprehensive','confidential','consecutive','considerable','consult','coordinate','deduct','demonstrate','designate','distribute','duplicate','efficient','eligible','endorse','enhance','ensure','evaluate','exceed','exclusive','expand','expertise','extensive','finalize','flexible','generate'],
  paras: [
    {
      en: 'Our hotel decided to expand last year. The board anticipated that visitor numbers would exceed the previous figures, and an extensive study showed they were right. The land adjacent to the building was for sale at an affordable price, so the owners authorized the purchase and work commenced in May.',
      ja: '当ホテルは昨年、増築を決めた。取締役会は来訪者数が従来の数字を上回ると予想しており、大規模な調査でそれが正しいと分かった。建物に隣接する土地が手頃な価格で売りに出ていたため、経営陣は購入を承認し、工事は5月に開始された。'
    },
    {
      en: 'I was asked to coordinate the project. First I consulted an architect with expertise in small hotels. She assessed the site for three consecutive days and produced a comprehensive report of approximately ninety pages. It was confidential, so only four people were eligible to read it.',
      ja: '私はそのプロジェクトの調整を任された。まず、小規模ホテルの専門知識を持つ建築士に相談した。彼女は3日連続で敷地を査定し、およそ90ページに及ぶ包括的な報告書を作成した。それは機密扱いだったので、読む資格があるのは4人だけだった。'
    },
    {
      en: 'The plan had to comply with the city fire rules. The architect demonstrated two designs and asked us to evaluate them. The first was cheaper; the alternative was more efficient in winter and would generate less waste heat. We chose the second, although it cost a considerable amount more.',
      ja: '計画は市の防火規則に適合しなければならなかった。建築士は2つの設計を実演して見せ、私たちに評価するよう求めた。1つ目は安価で、もう一方の案は冬により効率的で、排熱も少なかった。かなりの金額が上乗せになったが、私たちは後者を選んだ。'
    },
    {
      en: 'The new wing can accommodate forty more guests. Every room has a designated work desk, and the lighting was chosen to enhance the wood in the walls. We duplicated the old floor plan on two levels so that cleaning would stay simple, and we made the check-out time flexible to ensure that business guests are never rushed.',
      ja: '新館はさらに40名の客を収容できる。どの部屋にも所定の作業机があり、照明は壁の木材を引き立てるように選ばれた。清掃が簡単なままであるよう、旧来の間取りを2つの階に複製し、出張客が急かされることのないよう、チェックアウト時刻を柔軟にした。'
    },
    {
      en: 'Marketing was the last step. A well-known travel writer agreed to endorse the hotel after a free stay. We distributed leaflets at the station and offered a complimentary breakfast to anyone who booked before July. Guests who stayed three nights received an exclusive discount card, and we deducted ten percent from the second booking.',
      ja: '最後の段階は宣伝だった。著名な旅行作家が、無料宿泊のあとにホテルを推薦することに同意してくれた。私たちは駅でチラシを配り、7月より前に予約した人には無料の朝食を提供した。3泊した客には限定の割引カードを渡し、2回目の予約から10パーセントを差し引いた。'
    },
    {
      en: 'The market here is competitive, but the changes have been beneficial. Local restaurants collaborate with us on dinner plans, and our staff finally chose the appropriate uniform after months of argument. We will finalize the second phase this winter.',
      ja: 'この地域の市場は競争が激しいが、今回の変更は有益だった。地元のレストランは夕食プランで私たちと協力してくれているし、従業員も何か月もの議論の末にようやくふさわしい制服を選んだ。第2期の計画は今年の冬に最終決定する。'
    },
    {
      en: 'The building work did not always go smoothly. In August the contractor told us that the steel would arrive late, and we had to evaluate whether to wait or to pay extra. Waiting would have been cheaper, but it would have pushed the opening past the autumn season, when our rooms are most competitive. The owners authorized the additional cost, and the frame was finished in three consecutive weeks.',
      ja: '建築工事はいつも順調というわけではなかった。8月、施工業者から鉄骨の到着が遅れると告げられ、待つか追加で払うかを評価しなければならなかった。待つほうが安上がりではあったが、それでは開業が秋の行楽期を過ぎてしまう。その時期こそ当ホテルの客室が最も競争力を持つのだ。経営陣は追加費用を承認し、骨組みは3週連続の作業で仕上がった。'
    },
    {
      en: 'We also had to think about the staff. The new wing needs six more people, and the training must be comprehensive enough that nobody feels lost on the first morning. I asked the head of housekeeping to coordinate the schedule and to demonstrate each task herself. Anyone who has worked here for a year is eligible for the senior rate, which is generous by local standards. We expect the extra rooms to generate enough income to cover the loan in eight years, and an early estimate suggests the figure may exceed that.',
      ja: '従業員についても考えなければならなかった。新館にはあと6人が必要で、研修は初日の朝に誰も戸惑わない程度に包括的でなければならない。私は客室部門の責任者に、日程を調整し、各作業を自分で実演してみせるよう頼んだ。ここで1年働いた人は上級の時給を受ける資格があり、それは地元の水準からすれば手厚い。増えた客室が8年で借入金を賄えるだけの収益を生むと見込んでおり、早い段階の見積もりでは、その数字を上回る可能性もあるという。'
    },
    {
      en: 'The opening was in April. Two hundred people came, including the travel writer who had promised to endorse us. He stayed one night, wrote four hundred words, and every room was booked for the following weekend. The owners now want to expand again, this time into the building on the corner. I have asked them to wait until we can assess a full year of figures.',
      ja: '開業は4月だった。推薦を約束してくれた旅行作家を含め、200人が訪れた。彼は1泊し、400語の記事を書き、翌週末は全室が予約で埋まった。経営陣は今度は角のビルへと、さらに拡張したがっている。私は、まる1年分の数字を査定できるまで待ってほしいと頼んだ。'
    }
  ]
},

{
  id: 'p4',
  deckId: 'toeic730',
  title: 'Moving and Starting Over',
  titleJa: '移転とやり直し',
  scope: 'TOEIC 730点レベル ②',
  items: ['implement','incorporate','initiate','inquiry','inventory','itinerary','mandatory','modify','objective','obtain','outstanding','overhaul','oversee','participant','permanent','personnel','potential','preliminary','prior','procedure','prohibit','prospective','qualify','regarding','reimburse','relevant','reliable','relocate','remind','renovation','revise','subsequent','sufficient','tentative','terminate','transaction','utilize','vacancy','verify','warranty'],
  paras: [
    {
      en: 'Head office decided to relocate our team to a smaller building and to overhaul the way we work. The main objective was to cut costs without losing reliable service. A preliminary study was initiated in January, and the personnel department oversaw the whole move.',
      ja: '本社は私たちのチームをより小さな建物へ移転させ、働き方を全面的に見直すことを決めた。主な目的は、信頼できるサービスを損なわずに費用を削ることだった。予備調査が1月に開始され、人事部が移転全体を統括した。'
    },
    {
      en: 'Prior to the move we had to check the inventory. Every desk, chair and laptop was counted, and each transaction was recorded so that we could verify the list later. Items still under warranty were kept; the rest were sold. The procedure took three weeks and was mandatory for every floor.',
      ja: '移転に先立ち、在庫を確認しなければならなかった。机、椅子、ノートパソコンをすべて数え、あとで一覧を照合できるよう取引を1件ずつ記録した。まだ保証期間内の物は残し、残りは売却した。この手順には3週間かかり、全フロアで必須とされた。'
    },
    {
      en: 'The new office needed a renovation before we could move in. Smoking was prohibited everywhere, and the plan had to be modified twice because the first design did not leave sufficient space for meetings. The builders incorporated a small kitchen into the corner, which turned out to be an outstanding idea.',
      ja: '新しい事務所は、入居する前に改装が必要だった。喫煙はどこでも禁止され、最初の設計では会議に十分な広さが取れなかったため、計画は2度修正された。施工業者は隅に小さなキッチンを組み込んだが、これが実に見事な案だった。'
    },
    {
      en: 'Meanwhile I answered every inquiry from staff. People wanted to know whether the parking permit was permanent, whether they would be reimbursed for taxi fares, and whether anyone would qualify for a home-working day. I reminded them that the schedule was still tentative and that only relevant questions could be answered at that stage.',
      ja: 'その間、私は職員からのあらゆる問い合わせに答えた。駐車許可は恒久的なものか、タクシー代は払い戻されるのか、在宅勤務の資格を得られる人はいるのか、といったことをみな知りたがった。私は、予定はまだ暫定的であり、その段階で答えられるのは関連のある質問だけだと伝えた。'
    },
    {
      en: 'We implemented the new booking system in April. Two hundred participants joined the training, where they learned how to utilize the search function and how to obtain an approval code. Regarding the old system, we terminated the contract at the end of the month.',
      ja: '4月に新しい予約システムを導入した。200名の参加者が研修に加わり、検索機能を活用する方法と承認コードを取得する方法を学んだ。旧システムについては、月末で契約を終了した。'
    },
    {
      en: 'There is still one vacancy on the team, and a prospective candidate visits next week. I have already revised her itinerary twice. In the subsequent months we expect the office to show real potential for growth.',
      ja: 'チームにはまだ1つ空きがあり、見込みのある候補者が来週訪ねてくる。彼女の旅程はすでに2度修正した。それに続く数か月で、この事務所は成長の確かな可能性を見せてくれるだろう。'
    },
    {
      en: 'Not everything went to plan. In May we discovered that the new floor could not accommodate the server rack, and the procedure for moving it was more complicated than anyone had expected. The personnel department had to modify the timetable again, and I sent a note to remind everyone that the dates were still tentative. Two people asked whether they would be reimbursed for the extra travel; the answer was yes, but only with a receipt.',
      ja: 'すべてが計画どおりに進んだわけではない。5月、新しいフロアにサーバーラックが収まらないことが分かり、それを移す手順は誰が思っていたよりも複雑だった。人事部は日程を再び修正しなければならず、私は日付がまだ暫定であることを念押しする連絡を送った。2人から追加の交通費は払い戻されるのかと聞かれた。答えは「はい、ただし領収書がある場合のみ」だった。'
    },
    {
      en: 'By August the office was working normally. The inventory list has been verified twice since the move, and every relevant document is stored in one place. I still have to oversee the final stage, which is the disposal of the old furniture. Regarding the warranty on the printers, the supplier confirmed that it transfers with the machines, so we did not have to obtain a new one. The whole project has been a preliminary test of how the company might relocate other teams, and the objective now is to write down what we learned.',
      ja: '8月には事務所は普通に動くようになった。在庫一覧は移転後に2度照合され、関連する書類はすべて一か所に保管されている。私にはまだ最終段階を統括する仕事が残っている。古い家具の処分だ。プリンターの保証については、機械とともに引き継がれると業者が確認してくれたので、新たに取得する必要はなかった。このプロジェクト全体が、会社が他のチームを移転させる場合の予備的な試みであり、今の目的は学んだことを書き残すことだ。'
    },
    {
      en: 'One thing surprised me. The team works better in the smaller space than it did before. People overhear each other, so a question that used to travel by email is now answered in ten seconds. That was never part of the plan, and no preliminary study would have predicted it. If we relocate another team next year, I will put it in the report as the one benefit nobody can budget for.',
      ja: '1つ驚いたことがある。チームは以前より狭い場所のほうがうまく機能している。互いの話が耳に入るので、以前ならメールで往復していた質問が10秒で解決するのだ。それは計画の一部ではまったくなかったし、どんな予備調査も予測できなかっただろう。来年もう1つのチームを移転させるなら、予算には計上しようのない唯一の利点として報告書に書くつもりだ。'
    }
  ]
}
,

{
  id: 'p5',
  deckId: 'toeic860',
  title: 'The Acquisition',
  titleJa: '買収',
  scope: 'TOEIC 860点レベル ①',
  items: ['accrue','acquisition','adhere','alleviate','allocate','ambiguous','appraisal','arbitrary','ascertain','attribute','coincide','commensurate','compelling','compensate','compile','concise','conform','consolidate','contingency','culminate','curtail','defer','delegate','deploy','deteriorate','deviate','disclose','discrepancy','diversify','elicit','endeavor','entail','exempt','expedite','feasible','forfeit','hinder','imperative','inadvertently','incentive'],
  paras: [
    {
      en: 'The acquisition of a smaller rival was the largest project of my career. The board wanted to diversify the business, and an internal appraisal suggested that the plan was feasible. Even so, it was imperative that every figure be checked before we disclosed anything to the market.',
      ja: '小規模な競合他社の買収は、私の職歴で最大のプロジェクトだった。取締役会は事業を多角化したいと考えており、社内の査定はその計画が実行可能だと示していた。それでも、市場に何かを開示する前に、すべての数字を確認することが絶対に必要だった。'
    },
    {
      en: 'I was asked to compile the financial history of the target company. The work entailed reading nine years of accounts. Early on I found a discrepancy of two million yen between two reports. The wording of the note was ambiguous, so I could not immediately ascertain whether it was a mistake or something worse.',
      ja: '私は買収対象企業の財務の履歴をまとめるよう頼まれた。その作業は9年分の会計書類を読むことを伴った。早い段階で、2つの報告書のあいだに200万円の食い違いを見つけた。注記の書きぶりが曖昧だったため、それが単なる誤りなのか、もっと悪いものなのかを即座に突き止めることはできなかった。'
    },
    {
      en: 'My manager delegated the investigation to me and allocated three analysts to the team. We deployed a small audit tool to compare the files, and the results coincided with my first guess: an old lease had been recorded twice, inadvertently, by a clerk who had since left. Nobody had tried to deviate from the rules.',
      ja: '上司はその調査を私に委任し、3名の分析担当をチームに割り当てた。私たちはファイルを比較するために小さな監査ツールを導入し、その結果は私の最初の推測と一致した。古いリース契約が、すでに退職した事務員によってうっかり二重に記録されていたのだ。規則から逸脱しようとした者はいなかった。'
    },
    {
      en: 'The delay hindered the timetable, so we had to defer the announcement by a month. To alleviate the pressure on the team I curtailed the weekly meetings and asked the lawyers to expedite their review. Their fee was commensurate with the speed we demanded.',
      ja: 'この遅れが日程を妨げたため、発表を1か月先送りしなければならなかった。チームへの負荷を和らげるために、私は週次会議を切り詰め、弁護士たちには確認作業を迅速に進めてほしいと頼んだ。彼らの報酬は、こちらが要求した速さに見合ったものだった。'
    },
    {
      en: 'We also had to adhere to the listing rules and conform to the disclosure standard. A contingency plan was written in case the price deteriorated before the signing date. Under the agreement the seller would forfeit the deposit if they walked away, and both sides were exempt from penalties in the event of an earthquake.',
      ja: '私たちは上場規則を遵守し、開示基準に適合する必要もあった。署名日より前に価格が悪化した場合に備えて、緊急時対応計画が作成された。契約では、売り手が手を引いた場合には手付金を失うこととされ、地震が起きた場合には双方が違約金を免除された。'
    },
    {
      en: 'The seller argument was compelling but not always concise; one letter ran to forty pages. Our reply was two. We offered a small incentive to their managers so that they would stay, and we promised to compensate anyone whose role disappeared.',
      ja: '売り手側の主張は説得力があったが、いつも簡潔とは限らなかった。ある書簡は40ページに及んだ。こちらの返信は2ページだった。私たちは先方の管理職に残ってもらえるよう小さな報奨を提示し、職がなくなる者には補償すると約束した。'
    },
    {
      en: 'After the signing we consolidated the two accounting systems. Interest on the loan began to accrue from the first day. Some staff attributed our success to luck; I would call it a long endeavor. A short survey elicited mostly positive answers, though a few were arbitrary. The project culminated in a quiet dinner for eleven people.',
      ja: '署名のあと、私たちは2つの会計システムを統合した。借入金の利息は初日から発生し始めた。私たちの成功を運のおかげだとする職員もいたが、私はそれを長い努力と呼びたい。短いアンケートはおおむね前向きな回答を引き出したが、いくつかは恣意的だった。このプロジェクトは、11人の静かな夕食会で幕を閉じた。'
    },
    {
      en: 'Six months later I was asked to compile a short review of the whole process. It was not a comfortable document to write. The timetable had been too tight from the start, and the pressure to expedite everything had almost caused a serious error. My own recommendation was blunt: allocate more time, delegate earlier, and never let a single ambiguous line in an old report sit unexamined for a week. The board read it, thanked me, and filed it. Whether anyone will adhere to it during the next acquisition, I cannot ascertain.',
      ja: '半年後、私は一連の過程について短い総括をまとめるよう頼まれた。書いていて気分のいい文書ではなかった。日程は最初からきつすぎたし、何もかもを迅速に進めよという圧力のせいで、危うく重大な誤りを起こすところだった。私自身の提言は率直なものだった。もっと時間を割り当てること、もっと早く任せること、そして古い報告書の曖昧な一行を1週間も未検証のまま放置しないこと。取締役会はそれを読み、私に礼を言い、そして綴じてしまった。次の買収でそれを守る者がいるかどうかは、私には突き止めようがない。'
    },
    {
      en: 'The two companies share a building now. On the ground floor there is a wall of photographs from the old firm, put there so that nobody forgets what was bought. I walk past it every morning. The numbers in my report will be forgotten within a year; the photographs will not. That, I think, is the part of an acquisition that no appraisal can measure.',
      ja: '今では2社が1つの建物を共有している。1階には旧会社の写真が壁一面に飾られていて、何を買ったのかを誰も忘れないようにそこに置かれている。私は毎朝その前を通る。報告書の数字は1年で忘れられるだろうが、写真は忘れられない。それこそが、どんな査定でも測れない買収の一面なのだと思う。'
    }
  ]
},

{
  id: 'p6',
  deckId: 'toeic860',
  title: 'Rebuilding the Old Factory',
  titleJa: '古い工場を建て直す',
  scope: 'TOEIC 860点レベル ②',
  items: ['incur','indispensable','inherent','innovative','integrate','intermittent','jeopardize','lucrative','meticulous','mitigate','negligible','nominal','obsolete','offset','optimal','outsource','pertinent','preclude','preliminarily','proficiency','prolong','proximity','prudent','reciprocal','rectify','redundant','replenish','scrutinize','stipulate','streamline','substantial','supersede','surplus','sustainable','tangible','thorough','unanimous','versatile','viable','waive'],
  paras: [
    {
      en: 'Our oldest factory was becoming obsolete. The machines broke down with intermittent faults that were hard to trace, and repairs incurred costs we could no longer ignore. The board agreed, unanimously, that doing nothing would jeopardize the whole plant.',
      ja: '当社で最も古い工場は時代遅れになりつつあった。機械は原因を追いにくい断続的な不具合で故障し、修理はもはや無視できない費用を生じさせていた。取締役会は、何もしなければ工場全体を危険にさらすことになると全会一致で認めた。'
    },
    {
      en: 'An innovative engineer named Sato was brought in to streamline the line. She spent two weeks on the floor and scrutinized every step. Her report was thorough and meticulous: forty pages, with a substantial amount of data behind each claim. Three of the old checks, she wrote, were redundant and could be removed.',
      ja: '佐藤という革新的な技術者が、生産ラインを合理化するために招かれた。彼女は2週間を現場で過ごし、すべての工程を精査した。その報告書は徹底しており、几帳面だった。40ページあり、主張の一つひとつの裏にかなりの量のデータがあった。従来の検査のうち3つは余分であり、取り除けると彼女は書いていた。'
    },
    {
      en: 'Her main idea was to integrate the two packing lines into one versatile system. The new layout would supersede the design from 1998. It was viable only if we could keep the proximity between the store room and the line, so that workers could replenish materials quickly.',
      ja: '彼女の中心的な考えは、2つの梱包ラインを1つの多用途なシステムに統合することだった。新しい配置は1998年の設計に取って代わることになる。それが実行可能なのは、作業員が資材を素早く補充できるよう、保管室とラインの近さを保てる場合に限られた。'
    },
    {
      en: 'The savings were tangible. Energy use fell by a fifth, which helped offset the price of the equipment. The remaining risk was small, negligible in her words, and could be mitigated with a longer test period. We agreed preliminarily in March and signed in June.',
      ja: '節約の効果は具体的だった。エネルギー使用量は5分の1減り、それが設備の価格を相殺するのに役立った。残るリスクは小さく、彼女の言葉では取るに足らないもので、試験期間を長くすることで軽減できた。私たちは3月に暫定的に合意し、6月に署名した。'
    },
    {
      en: 'The contract stipulated a nominal fee for training and a reciprocal arrangement: their engineers would visit us twice a year, and ours would visit them. We asked them to waive the late-delivery penalty for the first month, and they agreed. That clause did not preclude a claim later.',
      ja: '契約は、研修についてはわずかな料金を規定し、相互の取り決めも定めていた。先方の技術者が年に2回こちらを訪れ、こちらの技術者が先方を訪れるというものだ。私たちは最初の1か月については納期遅延の違約金を免除してほしいと頼み、先方は同意した。その条項は、のちの請求を妨げるものではなかった。'
    },
    {
      en: 'We decided not to outsource the maintenance. Keeping the skill in-house was indispensable, and the proficiency of our own team was already high. It seemed the prudent choice, and the optimal one for the long run.',
      ja: '私たちは保守を外部委託しないことにした。技術を社内に留めておくことは不可欠であり、自社チームの習熟度はすでに高かった。それが慎重な選択に思えたし、長期的には最適な選択でもあった。'
    },
    {
      en: 'There are risks inherent in any change of this size. One motor failed in week three, and we had to rectify the wiring before the line could run again. But the surplus stock we had built up meant no customer noticed. The plant is now sustainable enough to prolong its life by another fifteen years, and the business has become lucrative again. Every pertinent figure is in the annual report.',
      ja: 'この規模の変更には、どんなものであれ本来的なリスクが伴う。3週目にモーターが1台故障し、ラインを再び動かす前に配線を是正しなければならなかった。しかし積み上げておいた余剰在庫のおかげで、気づいた顧客は一人もいなかった。工場は今や、寿命をさらに15年延ばせるだけ持続可能になり、事業は再び収益性の高いものになった。関連する数字はすべて年次報告書に載っている。'
    },
    {
      en: 'The work was not finished when the line restarted. We still had to integrate the reporting software, and the first version was so redundant that operators ignored half the screens. A simpler design superseded it after two months. Sato returned in the autumn to scrutinize the results and told us, in her meticulous way, that we had achieved about eighty percent of what was viable. The remaining twenty, she said, would incur costs that no saving could offset. We decided that was a prudent place to stop.',
      ja: 'ラインが再稼働しても作業は終わっていなかった。報告用ソフトの統合がまだ残っており、最初の版は余分な要素が多すぎて、作業員は画面の半分を無視していた。2か月後、もっと簡素な設計がそれに取って代わった。佐藤は秋に戻ってきて結果を精査し、几帳面な調子で、実行可能なことのおよそ8割を達成したと私たちに告げた。残りの2割は、どんな節約でも相殺できないほどの費用を生じさせるという。私たちは、そこでやめるのが慎重な判断だと考えた。'
    },
    {
      en: 'I visited the plant again last month. The floor is quieter than it used to be, and the light is better. An operator who has worked there for thirty years told me that he can now hear the machine that matters. He said it as a joke, but it is the clearest description of the project that anyone has given me. The report I wrote runs to sixty pages; his sentence runs to eleven words.',
      ja: '先月、私はまた工場を訪ねた。現場は以前より静かで、照明も良くなっている。そこで30年働いている作業員が、今なら肝心な機械の音が聞き分けられると私に言った。彼は冗談として言ったのだが、それはこれまで誰から聞いたよりも明快なこのプロジェクトの説明だった。私が書いた報告書は60ページに及ぶ。彼の一文はたった11語だ。'
    }
  ]
},

{
  id: 'p7',
  deckId: 'phrases',
  title: 'The Spring Trade Fair',
  titleJa: '春の見本市',
  scope: '句動詞・熟語 ①',
  items: ['account for','ahead of schedule','as of','at the latest','be about to','be aware of','be entitled to','be in charge of','be responsible for','be subject to','be supposed to','break down','bring in','bring up','call off','carry out','catch up on','check in','come across','come up with','count on','cut back on','deal with','drop by','drop off','due to','end up','fall behind','figure out','fill in for','fill out','follow up on','free of charge','get back to','get in touch with','get rid of','give out','go ahead with','go over','hand in'],
  paras: [
    {
      en: 'As of Monday I am in charge of our booth at the spring trade fair. My colleague Mori is responsible for the printing, and I deal with everything else. I am supposed to send the floor plan to the organiser by Friday at the latest.',
      ja: '月曜日の時点で、春の見本市のブースは私が担当している。同僚の森が印刷物を担当し、それ以外はすべて私が対処する。私は遅くとも金曜日までに、主催者へ会場図を送ることになっている。'
    },
    {
      en: 'Last year things did not go well. Our van broke down on the motorway, we fell behind by half a day, and we ended up setting the stand up at midnight. Due to that experience, I decided to go ahead with a different plan this time.',
      ja: '昨年はうまくいかなかった。うちのバンが高速道路で故障し、私たちは半日遅れ、結局は真夜中にブースを設営することになった。その経験のせいで、今回は別の計画を進めることにした。'
    },
    {
      en: 'In January I came up with a simple idea and brought it up at the team meeting. Instead of shipping the panels ourselves, we would ask a local firm to carry out the whole job. I got in touch with three companies and went over their quotations line by line. The cheapest one wanted to charge for storage, which accounted for almost a third of the price.',
      ja: '1月に私は単純な案を思いつき、チームの会議でそれを持ち出した。パネルを自分たちで輸送する代わりに、地元の業者に一切を実行してもらおうというものだ。私は3社に連絡を取り、見積もりを1行ずつ検討した。いちばん安い会社は保管料を請求するつもりで、それが価格のほぼ3分の1を占めていた。'
    },
    {
      en: 'I filled out the application form, handed it in on the same day, and followed up on it a week later. The organiser got back to me quickly. Every exhibitor is entitled to two parking passes, and small stands are subject to a height limit of three metres, something I had not been aware of before.',
      ja: '私は申込書に記入し、その日のうちに提出し、1週間後に追って確認した。主催者はすぐに返事をくれた。出展者はみな駐車券を2枚受け取る権利があり、小さなブースは3メートルの高さ制限を受けるとのことで、これは以前は知らなかったことだった。'
    },
    {
      en: 'We finished ahead of schedule for once. I checked in at the hotel on Thursday evening, then dropped by the hall to see the stand. A cleaner was still there. He gave out a small map to everyone who walked past, free of charge.',
      ja: '今回ばかりは予定より早く終わった。木曜の夕方にホテルにチェックインし、それからブースを見に会場へ立ち寄った。清掃員がまだそこにいた。彼は通りかかる人みんなに、小さな地図を無料で配っていた。'
    },
    {
      en: 'On the first morning I was about to open the boxes when I came across a problem: the brochures were still in the office. Mori dropped them off at ten. While I waited I tried to figure out how to fill the empty table, and I got rid of two broken stands that nobody would miss.',
      ja: '初日の朝、箱を開けようとしたところで問題に出くわした。パンフレットがまだ事務所にあったのだ。森が10時にそれらを届けてくれた。待っている間、私は空いたテーブルをどう埋めるか考え出そうとし、誰も惜しまないであろう壊れた什器を2つ処分した。'
    },
    {
      en: 'The fair itself was busy. We brought in more than two hundred new contacts. Mori had to fill in for me on Saturday because I was ill, and he did it without complaint; I can always count on him. In the evening I caught up on the emails I had missed. The company has decided to cut back on travel next year, so the autumn fair may be called off, but this one was worth it.',
      ja: '見本市そのものは盛況だった。私たちは200件を超える新規の連絡先をもたらした。土曜は私が体調を崩したので森が代役を務めてくれ、彼は文句ひとつ言わなかった。彼のことはいつでも頼りにできる。夜には、見落としていたメールの遅れを取り戻した。会社は来年、出張を削減することを決めたので、秋の見本市は中止になるかもしれないが、今回は行く価値があった。'
    },
    {
      en: 'Next year I want to go over the whole plan again in January rather than March. If we get in touch with the printer early, we will not have to deal with rush fees, and nobody will have to fill in for anyone at the last minute. Mori says I worry too much. He may be right, but last year taught me that a fair can fall behind in a single afternoon and that it is very hard to catch up on lost time.',
      ja: '来年は、3月ではなく1月に計画全体をもう一度見直したい。印刷業者と早めに連絡を取れば、特急料金に対処せずに済むし、誰も土壇場で他人の代役を務めずに済む。森は私が心配しすぎだと言う。彼が正しいのかもしれないが、見本市は一日の午後だけで遅れをとることがあり、失った時間を取り戻すのは非常に難しいと、昨年学んだのだ。'
    }
  ]
},

{
  id: 'p8',
  deckId: 'phrases',
  title: 'Organising the Seminar',
  titleJa: '研修会を準備する',
  scope: '句動詞・熟語 ②',
  items: ['hand out','hold off','in addition to','in advance','in the meantime','keep in mind','keep track of','lay off','look forward to','look into','make sure','make up for','no later than','on behalf of','on schedule','on short notice','out of stock','pick up','point out','put off','put together','refer to','result in','run into','run out of','set aside','set up','sign up for','sort out','take advantage of','take care of','take over','take place','turn down','turn in','up to date','upon request','with regard to','work out','wrap up'],
  paras: [
    {
      en: 'The annual training seminar will take place on 14 October. I took over the job from Ueda, who left in July, and I want to make sure nothing is forgotten this time. With regard to the budget, we have slightly less than last year.',
      ja: '年に一度の研修会は10月14日に開催される。私は7月に退職した上田からこの仕事を引き継いだので、今回は忘れ物が何もないようにしたい。予算に関しては、昨年よりわずかに少ない。'
    },
    {
      en: 'I set up a shared folder and put together a checklist so that everyone can keep track of what is done. Please refer to it before you ask me anything, and keep in mind that the printer needs two days. Booking forms must be turned in no later than the first of October.',
      ja: '私は共有フォルダを用意し、誰もが進捗を把握できるようにチェックリストをまとめた。何か尋ねる前にそれを参照してほしい。また、印刷業者には2日かかることを覚えておいてほしい。申込書は10月1日までに提出しなければならない。'
    },
    {
      en: 'Staff can sign up for the seminar on the intranet. In addition to the main session, there are two short workshops in the afternoon. Anyone who wants lunch should order it in advance; we cannot arrange it on short notice. A vegetarian option is available upon request.',
      ja: '職員は社内ネットワークで研修会に申し込める。本編に加えて、午後には短い分科会が2つある。昼食を希望する人は事前に注文してほしい。急な連絡では手配できない。菜食の選択肢は希望に応じて用意できる。'
    },
    {
      en: 'Last week I ran into a problem. The room we always use is being repainted, so I had to look into other options and hold off on printing the programme. In the meantime I asked the hotel across the road. Their hall was out of stock of chairs, since they had lent them to a wedding, so I had to set aside part of the budget for rental.',
      ja: '先週、問題にぶつかった。いつも使う部屋が塗り替え中なので、他の選択肢を調べ、プログラムの印刷を見合わせなければならなかった。その間に、道路の向かいのホテルに問い合わせた。そこの会場は椅子が切らしていた。結婚式に貸し出していたからだ。そのため、予算の一部をレンタル用に確保しなければならなかった。'
    },
    {
      en: 'Two speakers cancelled. One turned down the invitation because the fee was too low, and the other had to put off her trip. I decided to take advantage of the change and invite a younger researcher instead. She agreed immediately, and I will pick her up at the station myself.',
      ja: '講演者が2名、辞退した。一人は謝礼が安すぎるという理由で招待を断り、もう一人は出張を延期せざるを得なかった。私はこの変更を利用して、代わりに若い研究者を招くことにした。彼女はすぐに承諾してくれたので、駅には私が自分で迎えに行く。'
    },
    {
      en: 'During the seminar Kimura will hand out the printed notes and take care of the microphones. If we run out of copies, the office can print more in ten minutes. I asked him to point out the emergency exits at the start.',
      ja: '研修会の当日は、木村が印刷した資料を配り、マイクの面倒を見る。部数が足りなくなったら、事務所が10分で増刷できる。私は彼に、冒頭で非常口を指し示すよう頼んだ。'
    },
    {
      en: 'There is one thing I need to sort out before then. The company decided to lay off four people in the Kobe office, and two of them had already registered. I will write to them on behalf of the director. It is a difficult letter, but ignoring it would result in something worse.',
      ja: 'それまでに片付けなければならないことが1つある。会社は神戸事務所の4名を解雇することを決めたが、そのうち2名はすでに参加登録をしていた。私は部長に代わって彼らに手紙を書くつもりだ。難しい手紙だが、放っておけばもっと悪い結果になるだろう。'
    },
    {
      en: 'If everything runs on schedule, we will wrap up by five. The feedback forms are up to date this year, and I have added one question about the venue. A small mistake in the timetable was made up for by starting ten minutes early. I look forward to hearing what people think, and I hope the day works out better than last year.',
      ja: 'すべてが予定どおりに進めば、5時までに締めくくれる。今年は感想用紙が最新のものになっており、会場についての質問を1つ加えた。時間割の小さな誤りは、10分早く始めることで埋め合わせた。みんなの感想を聞くのが楽しみだし、この日が昨年よりうまくいくことを願っている。'
    },
    {
      en: 'One more thing. If you have not signed up for the seminar yet, please do it this week. We had to turn down two late requests last year, and I do not want to do that again. If you run into any trouble with the form, ask someone in the office to help you, or send me a note and I will sort it out.',
      ja: 'もう1つだけ。まだ研修会に申し込んでいない人は、今週中にお願いします。昨年は遅れて届いた申し込みを2件断らざるを得ず、同じことをまたやりたくはありません。用紙のことで何か問題にぶつかったら、事務所の誰かに手伝ってもらうか、私に一報ください。こちらで片付けます。'
    }
  ]
}

];
