import type { LucideIcon } from 'lucide-react';
import { Headphones, HelpCircle, RefreshCcw, ShieldCheck, Truck } from 'lucide-react';

import type { ValuePropsSection } from '@/types/home';

/* ------------------------------------------------------------------ */
/*  ValueProps                                                         */
/*  4 icon + title + copy items. Horizontal scroll on mobile,          */
/*  evenly-spaced row on desktop.                                      */
/* ------------------------------------------------------------------ */

interface Props {
  data: ValuePropsSection;
}

/** Map icon names from home.json to imported components. */
const iconMap: Record<string, LucideIcon> = {
  Truck,
  ShieldCheck,
  RefreshCcw,
  Headphones,
};

function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? HelpCircle;
}

export function ValueProps({ data }: Props) {
  return (
    <section className="value-props">
      <div className="value-props__track">
        {data.items.map((item) => {
          const Icon = resolveIcon(item.icon);
          return (
            <div key={item.title} className="value-props__item">
              <Icon className="value-props__icon" aria-hidden="true" />
              <h3 className="value-props__title">{item.title}</h3>
              <p className="value-props__copy">{item.copy}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
