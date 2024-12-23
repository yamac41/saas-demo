function CreateNewUserLayout(
  props: React.PropsWithChildren<{
    modal: React.ReactNode;
  }>,
) {
  return (
    <>
      {props.modal}
      {props.children}
    </>
  );
}

export default CreateNewUserLayout;
