import { Component, input, computed } from '@angular/core';
import { MockupVariant } from '../data/projects';

const ACCENTS: Record<MockupVariant, string> = {
  hrms: '#5B8CFF', crm: '#9B7BFF', helpdesk: '#2EC4B6', social: '#F06292', shop: '#E8A33D',
  warehouse: '#38BDF8', landing: '#6C7CFF', rail: '#2FA36B', orders: '#F07B3F', calendar: '#1E9E61',
};

/**
 * Illustrative interface previews built in HTML/CSS.
 * They are deliberately labelled as illustrations so they are never mistaken
 * for production screenshots. Set `cover` on a project to use a real image instead.
 */
@Component({
  selector: 'app-mockup',
  template: `
    <div class="frame" [style.--m]="accent()" role="img" [attr.aria-label]="'Illustrative interface preview for ' + label()">
      <div class="chrome"><i></i><i></i><i></i><span>{{ url() }}</span></div>
      <div class="screen">
        @switch (variant()) {
          @case ('hrms') {
            <aside class="side">
              <b class="logo"></b>
              @for (s of ['Dashboard','Employees','Attendance','Overtime','Leave','Reports']; track s; let i = $index) {
                <span [class.on]="i === 3">{{ s }}</span>
              }
            </aside>
            <section class="main">
              <div class="title">Overtime approval <em class="pill">March</em></div>
              <div class="kpis">
                <div><small>Requests</small><strong>128</strong></div>
                <div><small>Pending</small><strong>23</strong></div>
                <div><small>Approved hrs</small><strong>412</strong></div>
              </div>
              <div class="filters"><span>Department</span><span>Section</span><span>Status</span></div>
              <div class="table">
                @for (r of hrRows; track r[0]) {
                  <div class="tr"><span class="av"></span><span>{{ r[0] }}</span><span class="mono">{{ r[1] }}</span><span class="st" [attr.data-s]="r[2]">{{ r[2] }}</span></div>
                }
              </div>
            </section>
          }
          @case ('crm') {
            <aside class="side">
              <b class="logo"></b>
              @for (s of ['Home','Contacts','Accounts','Deals','Email insights']; track s; let i = $index) {
                <span [class.on]="i === 4">{{ s }}</span>
              }
            </aside>
            <section class="main">
              <div class="title">Email insights <em class="pill">Last 30 days</em></div>
              <div class="kpis">
                <div><small>Delivered</small><strong>98.2%</strong></div>
                <div><small>Opened</small><strong>41.7%</strong></div>
                <div><small>Clicked</small><strong>8.9%</strong></div>
              </div>
              <div class="chart area">
                <svg viewBox="0 0 300 90" preserveAspectRatio="none">
                  <path d="M0 70 C30 60 45 30 75 38 S120 62 150 44 S200 12 230 26 S275 40 300 18 L300 90 L0 90Z" class="fill"/>
                  <path d="M0 70 C30 60 45 30 75 38 S120 62 150 44 S200 12 230 26 S275 40 300 18" class="stroke"/>
                  <path d="M0 80 C40 76 70 64 110 70 S170 58 210 62 S270 50 300 52" class="stroke2"/>
                </svg>
              </div>
              <div class="widgets"><div></div><div></div></div>
            </section>
          }
          @case ('helpdesk') {
            <section class="main full">
              <div class="title">Support requests <em class="pill">Open · 14</em></div>
              <div class="table">
                @for (t of tickets; track t.id) {
                  <div class="tr ticket">
                    <span class="mono">#{{ t.id }}</span><span>{{ t.title }}</span>
                    <span class="who">{{ t.who }}</span>
                    <span class="timer" [class.late]="t.late">{{ t.due }}</span>
                  </div>
                }
              </div>
              <div class="assets">
                <div><small>Computers</small><strong>86</strong></div>
                <div><small>Printers</small><strong>12</strong></div>
                <div><small>Network</small><strong>9</strong></div>
              </div>
            </section>
          }
          @case ('social') {
            <aside class="side narrow">
              @for (s of ['Work','Social','Family','Plan']; track s; let i = $index) { <span [class.on]="i === 0">{{ s }}</span> }
            </aside>
            <section class="main chat">
              <div class="title">Design team</div>
              <div class="msg"><span class="av"></span><p>Pushed the new onboarding flow for review</p></div>
              <div class="msg me"><p>Looks great. Adding the task for QA now</p></div>
              <div class="task"><span class="check"></span>QA onboarding flow<em class="pill">Today</em></div>
              <div class="msg"><span class="av b"></span><p>Standup moved to 10:30</p></div>
              <div class="composer"></div>
            </section>
          }
          @case ('shop') {
            <section class="main full">
              <div class="shopbar"><b class="logo"></b><span>Watches</span><span>Shoes</span><span>Accessories</span><em class="cart">Cart 2</em></div>
              <div class="grid">
                @for (p of products; track p.n) {
                  <div class="card"><div class="ph" [attr.data-k]="p.k"></div><span>{{ p.n }}</span><b>৳{{ p.p }}</b></div>
                }
              </div>
            </section>
          }
          @case ('warehouse') {
            <section class="main full">
              <div class="title">Wave selections <em class="pill">$filter=status eq 'Open'</em></div>
              <div class="split">
                <div class="table compact">
                  @for (w of waves; track w[0]) {
                    <div class="tr"><span class="mono">{{ w[0] }}</span><span>{{ w[1] }} lines</span><span class="meter"><i [style.width.%]="w[2]"></i></span></div>
                  }
                </div>
                <div class="chart bubbles">
                  @for (b of bubbles; track $index) {
                    <i [style.left.%]="b[0]" [style.bottom.%]="b[1]" [style.width.cqi]="b[2]" [style.height.cqi]="b[2]"></i>
                  }
                  <small>On-time delivery</small>
                </div>
              </div>
            </section>
          }
          @case ('landing') {
            <section class="main full landing">
              <div class="hero-l">
                <div class="l1"></div><div class="l2"></div><div class="l3"></div>
                <span class="cta"></span>
              </div>
              <div class="sim">
                <small>Savings simulator</small>
                <div class="slider"><i></i><b></b></div>
                <div class="slider"><i style="width:40%"></i><b style="left:40%"></b></div>
                <strong>Estimated savings</strong>
                <div class="big"></div>
              </div>
            </section>
          }
          @case ('rail') {
            <section class="main full rail">
              <div class="title">Dhaka to Chattogram</div>
              <svg class="route" viewBox="0 0 400 150" preserveAspectRatio="xMidYMid meet">
                <path d="M20 30 L80 30 L120 55 L170 55 L210 85 L260 85 L300 110 L380 120" class="track"/>
                <path d="M20 30 L80 30 L120 55 L170 55 L210 85" class="done"/>
                @for (s of stations; track s.n) {
                  <g [attr.transform]="'translate(' + s.x + ' ' + s.y + ')'">
                    <circle r="4.5" [class.passed]="s.x <= 210" />
                    <text [attr.y]="s.up ? -10 : 18" text-anchor="middle">{{ s.n }}</text>
                  </g>
                }
                <circle cx="210" cy="85" r="9" class="train"/>
              </svg>
              <div class="hud"><span>Speed <b>72</b> km/h</span><span>Next <b>Akhaura</b></span><span>Signal <b class="green">Clear</b></span></div>
            </section>
          }
          @case ('orders') {
            <section class="main full">
              <div class="title">Today’s orders <em class="pill">Facebook page</em></div>
              <div class="kpis">
                <div><small>New</small><strong>37</strong></div>
                <div><small>Booked</small><strong>29</strong></div>
                <div><small>COD due</small><strong>৳48k</strong></div>
              </div>
              <div class="table">
                @for (o of orders; track o[0]) {
                  <div class="tr"><span class="mono">{{ o[0] }}</span><span>{{ o[1] }}</span><span class="st" [attr.data-s]="o[2]">{{ o[2] }}</span></div>
                }
              </div>
            </section>
          }
          @case ('calendar') {
            <section class="main full cal">
              <div class="title">October <em class="pill">Reminders · 3</em></div>
              <div class="days">
                @for (d of weekdays; track d) { <small>{{ d }}</small> }
                @for (d of days; track $index) {
                  <span [class.h]="d === 2 || d === 13" [class.t]="d === 28" [class.e]="d === 0">{{ d || '' }}</span>
                }
              </div>
            </section>
          }
        }
      </div>
      <span class="illus">Illustrative</span>
    </div>
  `,
  styleUrl: './mockup.component.scss',
})
export class MockupComponent {
  readonly variant = input.required<MockupVariant>();
  readonly label = input('project');
  readonly accent = computed(() => ACCENTS[this.variant()]);
  readonly url = computed(() => ({
    hrms: 'hrms / overtime / approval', crm: 'crm / insights / email', helpdesk: 'fixdesk / requests',
    social: 'zolojog / work / design-team', shop: 'shop / new-arrivals', warehouse: 'rimal / waves',
    landing: 'campaign / savings', rail: 'rail-chalak / route', orders: 'shipkoro / orders', calendar: 'caltask / month',
  })[this.variant()]);

  protected hrRows = [
    ['Production line A', '02:30', 'Pending'], ['Quality control', '01:45', 'Approved'],
    ['Maintenance', '03:00', 'Approved'], ['Dyeing unit', '02:15', 'Pending'], ['Finishing', '01:00', 'Returned'],
  ];
  protected tickets = [
    { id: 1042, title: 'Printer offline, 3rd floor', who: 'RA', due: '12m left', late: false },
    { id: 1041, title: 'VPN not connecting', who: 'TS', due: '1h 20m', late: false },
    { id: 1038, title: 'PC won’t boot, accounts', who: 'RA', due: 'Overdue', late: true },
    { id: 1036, title: 'New user mailbox', who: 'MK', due: '3h 05m', late: false },
  ];
  protected products = [
    { n: 'Chrono steel', p: '4,850', k: 'w' }, { n: 'Leather loafer', p: '3,200', k: 's' },
    { n: 'Minimal strap', p: '1,150', k: 'a' }, { n: 'Field watch', p: '5,400', k: 'w' },
    { n: 'Canvas sneaker', p: '2,600', k: 's' }, { n: 'Card wallet', p: '950', k: 'a' },
  ];
  protected waves = [['W-2291', 148, 92], ['W-2290', 96, 64], ['W-2288', 210, 40], ['W-2287', 72, 18]] as const;
  protected bubbles = [[10, 20, 9], [30, 45, 13], [52, 28, 7], [68, 58, 15], [82, 30, 10]];
  protected stations = [
    { n: 'Kamalapur', x: 20, y: 30, up: true }, { n: 'Airport', x: 80, y: 30, up: true },
    { n: 'Narsingdi', x: 120, y: 55, up: false }, { n: 'Bhairab', x: 170, y: 55, up: true },
    { n: 'B.Baria', x: 210, y: 85, up: false }, { n: 'Akhaura', x: 260, y: 85, up: true },
    { n: 'Cumilla', x: 300, y: 110, up: false }, { n: 'Chattogram', x: 380, y: 120, up: true },
  ];
  protected orders = [['SK-5512', 'Pathao', 'Booked'], ['SK-5511', 'Steadfast', 'Booked'], ['SK-5510', 'Check needed', 'Flagged'], ['SK-5509', 'RedX', 'Delivered']];
  protected weekdays = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];
  protected days = [0, 0, 0, 0, 0, 1, 2, ...Array.from({ length: 29 }, (_, i) => i + 3)];
}
