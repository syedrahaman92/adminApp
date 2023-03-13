import React, {useEffect} from "react"
import {ScrollView} from "react-native"
import {Button, Dialog, Portal, Snackbar, Text} from "react-native-paper"
import {ss} from "../styles"
import {useTheme} from "../util"

type Props = {
  err: {title: string; details: string}
}

export function ErrorSnackBar({err}: Props) {
  const [barVisible, setBarVisible] = React.useState(false)
  const [dialogVisible, setDialogVisible] = React.useState(false)

  const theme = useTheme()

  useEffect(() => {
    if (err.title) {
      setBarVisible(true)
    }
  }, [err])

  return (
    <>
      <Snackbar
        visible={barVisible}
        onDismiss={() => {
          setBarVisible(false)
        }}
        action={{
          label: "show",
          onPress: () => {
            setDialogVisible(true)
            setBarVisible(false)
          },
        }}
        theme={{colors: {onSurface: theme.colors.error, accent: theme.colors.accent}}}>
        {err.title}
      </Snackbar>
      <Portal>
        <Dialog
          style={[ss.phxs]}
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Error details</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
              <Text>{err.details}</Text>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}
