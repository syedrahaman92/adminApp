import * as React from "react"

import {Avatar, Button, Card, Title, Paragraph} from "react-native-paper"
import {ScheduledDriverInterval} from "../types"
import {useDeleteDriverMutation} from "../hooks/mutations"
import {removeForToday} from "../actions"

export type DriverIntervalsCardProps = {
  driverIntervals: ScheduledDriverInterval[]
  disabled?: boolean
}

export function DriverIntervalsCard(props: DriverIntervalsCardProps) {
  // hooks
  const mRemoveDriver = useDeleteDriverMutation()

  // local vars
  const iconChar = props.driverIntervals[0].name.charAt(0)

  return (
    <Card
      style={[
        {flexDirection: "row", marginHorizontal: 20, marginVertical: 10},
        mRemoveDriver.isLoading ? {opacity: 0.4} : {},
      ]}
      pointerEvents={mRemoveDriver.isLoading ? "none" : "auto"}>
      <Card.Title
        title={props.driverIntervals[0].name}
        subtitle={props.driverIntervals[0].driverPhone}
        left={props => <Avatar.Text {...props} label={iconChar} />}
      />
      <Card.Content>
        <Title>ID {props.driverIntervals[0].driverID}</Title>
        <Paragraph>
          Intervals:{" "}
          {props.driverIntervals.map(interval => {
            return (
              interval.intervalStart +
              "-" +
              interval.intervalEnd +
              (interval.isInWaitList ? "(W)" : "") +
              "  "
            )
          })}
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => removeForToday(mRemoveDriver, props.driverIntervals)}>
          REMOVE
        </Button>
      </Card.Actions>
    </Card>
  )
}
