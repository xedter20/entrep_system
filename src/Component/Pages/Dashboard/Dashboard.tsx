import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiGithub,
  mdiMonitorCellphone,
  mdiReload
} from '@mdi/js';
import React, { useState } from 'react';
import type { ReactElement } from 'react';
import Button from '../../Tailwind/Button';

import SectionMain from '../../Tailwind/Section/Main';
import SectionTitleLineWithButton from '../../Tailwind/Section/TitleLineWithButton';
import CardBoxWidget from '../../Tailwind/CardBox/Widget';
// import { useSampleClients, useSampleTransactions } from '../hooks/sampleData';
import CardBoxTransaction from '../../Tailwind/CardBox/Transaction';
// import { Client, Transaction } from '../interfaces';
import CardBoxClient from '../../Tailwind/CardBox/Client';
import SectionBannerStarOnGitHub from '../../Tailwind/Section/Banner/StarOnGitHub';
import CardBox from '../../Tailwind/CardBox';
import { sampleChartData } from '../../Tailwind/ChartLineSample/config';
// import ChartLineSample from '../../Tailwind/ChartLineSample';
// import NotificationBar from '../../Tailwind/NotificationBar';
// import TableSampleClients from '../../Tailwind/Table/SampleClients';
// import { getPageTitle } from '../config';

const DashboardPage = () => {
  // const { clients } = useSampleClients();
  // const { transactions } = useSampleTransactions();

  // const clientsListed = clients.slice(0, 4);

  // const [chartData, setChartData] = useState(sampleChartData());

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault();

    setChartData(sampleChartData());
  };

  return (
    <>
      <div>
        <SectionMain>
          <SectionTitleLineWithButton
            icon={mdiChartTimelineVariant}
            title="Overview"
            main>
            <Button
              href="https://github.com/justboil/admin-one-react-tailwind"
              target="_blank"
              icon={mdiGithub}
              label="Star on GitHub"
              color="contrast"
              roundedFull
              small
            />
          </SectionTitleLineWithButton>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
            <CardBoxWidget
              trendLabel="12%"
              trendType="up"
              trendColor="success"
              icon={mdiAccountMultiple}
              iconColor="success"
              number={512}
              label="Clients"
            />
            <CardBoxWidget
              trendLabel="16%"
              trendType="down"
              trendColor="danger"
              icon={mdiCartOutline}
              iconColor="info"
              number={7770}
              numberPrefix="Php "
              label="Sales"
            />
            <CardBoxWidget
              trendLabel="Overflow"
              trendType="warning"
              trendColor="warning"
              icon={mdiChartTimelineVariant}
              iconColor="danger"
              number={256}
              numberSuffix="%"
              label="Performance"
            />
          </div>
        </SectionMain>
      </div>
    </>
  );
};

export default DashboardPage;
