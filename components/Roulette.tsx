import { animated, useSpring } from "react-spring";
import { easePolyOut } from "d3-ease";
import { useEffect, memo, useRef } from "react";
import { calcWinner } from "../lib/calc";
import { Candidate } from "../stateManagement/states";

type Props = {
  radius: number;
  candidates: Candidate[];
  spinIt: boolean;
  onCurrentWinnerChange: (cw: Candidate) => void;
  onRest: () => void;
};

const PI = 3.1415;

const calcDashWidth = (radius: number, numSlots: number) => {
  return (radius * PI * 2) / numSlots;
};

function Roulette(props: Props) {
  const targets = props.candidates.filter((c) => !c.hide);
  const numSlots = targets.length;
  const [styles, api] = useSpring(() => ({
    from: { y: 0 },
    delay: 2000,
    config: {
      easing: easePolyOut,
      duration: 10000
    }
  }));
  let currentWinner: Candidate = { idx: -1, name: "dummy", hide: true };

  const circleProps = {
    r: props.radius,
    cx: 0,
    cy: 0
  };

  const dashWidth = calcDashWidth(circleProps.r, numSlots);
  const svgConfig = {
    width: 400,
    height: 400
  };

  const translateCood = {
    x: svgConfig.width / 2,
    y: svgConfig.height / 2
  };

  const initialRotate =
    numSlots % 2 === 0
      ? (numSlots / 2) % 2 === 0
        ? 360 / numSlots / 2
        : 0
      : 90;

  const prevSpinIt = useRef<boolean>();
  useEffect(() => {
    if (!prevSpinIt.current && props.spinIt) {
      styles.y.start({
        from: 0,
        to: 360 * 8 + 360 * Math.random(),
        onChange: () => {
          const y = styles.y.get();
          const winnerIdx = calcWinner(y, numSlots);
          const winner = targets[winnerIdx];
          if (winner.idx !== currentWinner.idx) {
            currentWinner = winner;
            props.onCurrentWinnerChange(winner);
          }
        },
        onRest: () => {
          const y = styles.y.get();
          const winnerIdx = calcWinner(y, numSlots);
          const winner = targets[winnerIdx];
          props.onRest();
          //alert(`Winner is ${winner.idx}: ${winner.name}`);
        }
      });
    }
    prevSpinIt.current = props.spinIt;
  }, [props.spinIt, styles.y, numSlots, targets]);

  return (
    <svg width={svgConfig.width} height={svgConfig.height}>
      <animated.g
        transform={
          props.spinIt
            ? styles.y.to(function (y) {
                return `rotate(${y}, ${translateCood.x + circleProps.cx}, ${translateCood.y + circleProps.cy}) translate(${translateCood.x}, ${translateCood.y})`;
              })
            : `translate(${translateCood.x}, ${translateCood.y})`
        }
      >
        <g
          transform={`rotate(${initialRotate}, ${circleProps.cx} ${circleProps.cy})`}
        >
          <circle
            r={circleProps.r}
            cx={circleProps.cx}
            cy={circleProps.cy}
            fill="bisque"
            stroke="tomato"
            strokeWidth={`${circleProps.r}`}
            strokeDasharray={`${dashWidth} ${dashWidth}`}
          />
          <g
            transform={`rotate(${360 / numSlots}, ${circleProps.cx} ${
              circleProps.cy
            })`}
          >
            <circle
              r={circleProps.r}
              cx={circleProps.cx}
              cy={circleProps.cy}
              fill="none"
              stroke="#47e3ff"
              strokeWidth={`${circleProps.r}`}
              strokeDasharray={`${dashWidth} ${dashWidth}`}
            />
          </g>
          {numSlots % 2 !== 0 ? (
            <g
              transform={`rotate(${360 / numSlots}, ${circleProps.cx} ${
                circleProps.cy
              })`}
            >
              <circle
                r={circleProps.r}
                cx={circleProps.cx}
                cy={circleProps.cy}
                fill="none"
                stroke="#54ff9f"
                strokeWidth={`${circleProps.r}`}
                strokeDasharray={`${dashWidth} ${dashWidth * (numSlots - 1)}`}
              />
            </g>
          ) : null}
        </g>
        {targets.map((c, i) => (
          <g
            transform={`rotate(${(360 / numSlots) * i}, ${circleProps.cx}, ${
              circleProps.cy
            }) translate(0, ${-props.radius * 1.5 + 25})`}
            key={i}
          >
            <text x={0} y={0} textAnchor="middle">
              {c.idx}
            </text>
          </g>
        ))}
      </animated.g>

      <g
        transform={`rotate(180, 10, 20) translate(${
          -translateCood.x + 10
        }, -10)`}
      >
        <polygon
          points="10,0 0,20 20,20"
          style={{ fill: "black", stroke: "purple", strokeWidth: 1 }}
        />
      </g>
    </svg>
  );
}

const candidatesEqual = (ca: Candidate, cb: Candidate) => {
  return ca.name === cb.name && ca.idx === cb.idx && ca.hide === cb.hide;
};
const areEqual = (prevProps: Props, nextProps: Props) => {
  const res =
    prevProps.radius === nextProps.radius &&
    prevProps.spinIt === nextProps.spinIt &&
    prevProps.candidates.length === nextProps.candidates.length &&
    prevProps.candidates
      .map((_, i) =>
        candidatesEqual(prevProps.candidates[i], nextProps.candidates[i])
      )
      .reduce((x, y) => x && y);
  return res;
};
export const MemoRoulette = memo(Roulette, areEqual);
