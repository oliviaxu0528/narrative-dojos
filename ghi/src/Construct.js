import './Construct.css'
import Harden from './img/Harden.jpg'
import Westbrook from './img/Westbrook.jpg'
import Durant from './img/Durant.jpg'
import NBA from './img/NBA.png'
import OKC from './img/OKC.jpg'

function Construct(props) {

    const pad2 = num => String(num).padStart(2, '0');

    return (
      <div className="App">
        <input type="checkbox" id="c1" />
        <input type="checkbox" id="c2" />
        <input type="checkbox" id="c3" />
        <input type="checkbox" id="c4" />
        {/* <div id="cover">
          <img src={NBA} />
        </div> */}
        <div class="flip-book">
          <div class="flip" id="p1">
            <div class="back">
              <img src={Westbrook} />
              <label class="back-btn" for="c1">
                Back
              </label>
            </div>
            <div class="front">
              <div class="cover">
                <div class="logo">
                  <img src={NBA} />
                </div>
              </div>
              <h2>OKC Big Three</h2>
              <p>Russell Westbrook</p>
              <p>James Harden</p>
              <p>Kevin Durant</p>
              <label class="next-btn" for="c1">
                Next
              </label>
            </div>
          </div>
          <div class="flip" id="p2">
            <div class="back">
              <img src={Harden} />
              <label class="back-btn" for="c2">
                Back
              </label>
            </div>
            <div class="front">
              <h2>Russell Westbrook</h2>
              <p>
                Russell Westbrook III is an American professional basketball
                player who most recently played for the Los Angeles Lakers of
                the National Basketball Association. A member of the NBA 75th
                Anniversary Team, he is a nine-time NBA All-Star and earned the
                NBA Most Valuable Player Award for the 2016-17 season.
              </p>
              <p>
                In 2017, the year he won the league MVP award, Westbrook became
                one of two players in NBA history to average a triple-double for
                a season, along with Oscar Robertson in 1962. He also set a
                record for the most triple-doubles in a season, with 42. He went
                on to average a triple-double the following two seasons as well
                as lead the league in assists and become the first player to
                lead the league in points and assists in multiple seasons.
              </p>
              <p>
                Westbrook played college basketball for the UCLA Bruins and
                earned third-team all-conference honors in the Pac-10. He was
                selected with the fourth overall pick in the 2008 NBA draft by
                the Seattle SuperSonics, who then relocated to Oklahoma City
                that same week. Westbrook has represented the United States
                national team twice, winning gold medals in the 2010 FIBA World
                Championship and the 2012 Olympics. In 2019, he was traded to
                the Houston Rockets, playing one season for the organization
                before being traded again to the Washington Wizards in 2020.
                After a season in Washington, he was traded to the Los Angeles
                Lakers in 2021. After two seasons with the Lakers, Westbrook was
                traded to the Utah Jazz in 2023.
              </p>
              <label class="next-btn" for="c2">
                Next
              </label>
            </div>
          </div>
          <div class="flip" id="p3">
            <div class="back">
              <img src={Durant} />
              <label class="back-btn" for="c3">
                Back
              </label>
            </div>
            <div class="front">
              <h2>James Harden</h2>
              <p>
                James Edward Harden Jr. is an American professional basketball
                player for the Philadelphia 76ers of the National Basketball
                Association. Harden is regarded as one of the greatest scorers
                and shooting guards in NBA history.
              </p>
              <p>
                He played college basketball for the Arizona State Sun Devils,
                where he was named a consensus All-American and Pac-10 Player of
                the Year in 2009. Harden was selected with the third overall
                pick in the 2009 NBA draft by the Oklahoma City Thunder. In
                2012, he was named NBA Sixth Man of the Year with the Thunder
                and helped the team reach the NBA Finals, where they lost to the
                Miami Heat in five games.
              </p>
              <p>
                Unhappy with the failure of the Oklahoma City Thunder to offer
                him a max contract, he refused their contract extension offer
                when it was substantially under the max. The Thunder
                subsequently traded him to the Houston Rockets before the
                2012-13 season. In his first season with the team he set or
                matched several team records and was named to his first All-NBA
                Team (a third-team selection), as well as his first NBA All-Star
                team. Over the next seven and a half seasons with the team he
                would lead the league in scoring three times and assists once,
                and was named the NBA Most Valuable Player in 2018. During his
                time in Houston, he was named to eight consecutive NBA All-Star
                teams and earned All-NBA Team honors seven times, including six
                first-team selections. In the beginning of the 2020-21 season,
                Harden was traded to the Brooklyn Nets as part of a four-team
                trade. With the Nets, he was named to his ninth and tenth
                consecutive All-Star games.
              </p>
              <label class="next-btn" for="c3">
                Next
              </label>
            </div>
          </div>
          <div class="flip" id="p4">
            <div class="back">
              <img src={OKC} />
              <label class="back-btn" for="c4">
                Back
              </label>
            </div>
            <div class="front">
              <h2>Kevin Durant</h2>
              <p>
                Kevin Wayne Durant, also known by his initials KD, is an
                American professional basketball player for the Phoenix Suns of
                the National Basketball Association. He played one season of
                college basketball for the Texas Longhorns, and was selected as
                the second overall pick by the Seattle SuperSonics in the 2007
                NBA draft.
              </p>
              <p>
                He played nine seasons with the franchise, which became the
                Oklahoma City Thunder in 2008, before signing with the Golden
                State Warriors in 2016, winning consecutive NBA championships in
                2017 and 2018. After sustaining an Achilles injury in the 2019
                finals, he joined the Brooklyn Nets as a free agent that summer.
                Following disagreements with the Nets' front office, he
                requested a trade during the 2022 offseason and was eventually
                traded to the Phoenix Suns in 2023. Durant is widely regarded as
                one of the greatest players and scorers of all time.
              </p>
              <p>
                Durant was a heavily recruited high school prospect who was
                widely regarded as the second-best player in his class. In
                college, he won numerous year-end awards and became the first
                freshman to be named Naismith College Player of the Year. As a
                professional, he has won two NBA championships, an NBA Most
                Valuable Player Award, two Finals MVP Awards, two NBA All-Star
                Game Most Valuable Player Awards, four NBA scoring titles, the
                NBA Rookie of the Year Award, been named to ten All-NBA teams
                (including six First Teams), and selected 13 times as an NBA
                All-Star. In 2021, Durant was named to the NBA 75th Anniversary
                Team.
              </p>
              <label class="next-btn" for="c4">
                Next
              </label>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Construct;
