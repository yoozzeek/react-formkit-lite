import Badge from "../src/components/Badge";
import { type SetStateAction, useRef, useState } from "react";

type DynamicBadgeType = { label: string; value: string; variant: string };

const baseBlockStyle = {
  display: "flex",
  gap: 4,
};

export default function BadgeExamples() {
  const selectedBadgesSetRef = useRef(new Set<string>());
  const [selectedBadges, setSelectedBadges] = useState<Array<string>>([]);

  const [dynamicBadges, setDynamicBadges] = useState<Array<DynamicBadgeType>>([
    {
      label: "Value 1",
      value: "value1",
      variant: "light",
    },
    {
      label: "Value 2",
      value: "value2",
      variant: "light",
    },
    {
      label: "Value N",
      value: "valueN",
      variant: "light",
    },
  ]);
  const [removedBadges, setRemovedBadges] = useState<Array<DynamicBadgeType>>([]);

  function handleToggleSelectBadge(key: string) {
    const selected = selectedBadgesSetRef.current;
    if (selected.has(key)) {
      selected.delete(key);
      setSelectedBadges((prev) => [...prev.filter((v) => v !== key)]);
    } else {
      selected.add(key);
      setSelectedBadges((prev) => [...prev, key]);
    }
  }

  function handleToggleRemoveBadge(badge: DynamicBadgeType) {
    const idx = dynamicBadges.findIndex((b) => b.value === badge.value);
    const shouldRemove = idx > -1;

    let nextDynamicFn: SetStateAction<Array<DynamicBadgeType>>,
      nextRemovedFn: SetStateAction<Array<DynamicBadgeType>>;
    if (shouldRemove) {
      nextDynamicFn = (prev) => [...prev.filter((b) => b.value !== badge.value)];
      nextRemovedFn = (prev) => [...prev, badge];
    } else {
      nextDynamicFn = (prev) => [...prev, badge];
      nextRemovedFn = (prev) => [...prev.filter((b) => b.value !== badge.value)];
    }

    setDynamicBadges(nextDynamicFn);
    setRemovedBadges(nextRemovedFn);
  }

  return (
    <section id="badge_examples">
      <h2>Badge examples</h2>
      <div>
        <h3>Variants</h3>
        <div style={baseBlockStyle}>
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="dark">Dark</Badge>
        </div>
      </div>
      <div>
        <h3>Selectable</h3>
        <p>Select any badge in the list:</p>
        <div style={baseBlockStyle}>
          {[
            {
              label: "Value 1",
              value: "value1",
              variant: "light",
            },
            {
              label: "Value 2",
              value: "value2",
              variant: "light",
            },
            {
              label: "Value N",
              value: "valueN",
              variant: "light",
            },
          ].map((item) => (
            <Badge
              key={item.value}
              id={item.value}
              variant={item.variant as any}
              selected={selectedBadgesSetRef.current.has(item.value)}
              onClick={handleToggleSelectBadge}
            >
              {item.label}
            </Badge>
          ))}
        </div>
        {selectedBadges.length > 0 && (
          <div style={{ marginTop: "1em" }}>
            <strong>Selected</strong>
            <ul>
              {selectedBadges.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <h3>Removable</h3>
        <p>Remove any badge from the list:</p>
        <div style={baseBlockStyle}>
          {dynamicBadges.map((badge) => (
            <Badge
              key={badge.value}
              id={badge.value}
              variant={badge.variant as any}
              onRemove={() => handleToggleRemoveBadge(badge)}
            >
              {badge.label}
            </Badge>
          ))}
        </div>
        {removedBadges.length > 0 && (
          <div style={{ marginTop: "1em" }}>
            <strong>Removed</strong>
            <ul>
              {removedBadges.map((badge) => (
                <li key={badge.value}>
                  {badge.label}
                  <br />
                  <button type="button" onClick={() => handleToggleRemoveBadge(badge)}>
                    Recover
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
