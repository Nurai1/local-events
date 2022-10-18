import gql from 'graphql-tag';

const PassedEventsUpdateByFilterMutation = gql`
  mutation PassedEventsUpdateByFilterMutation($dateNow: DateTime!) {
    eventUpdateByFilter(
      data: { passed: { set: true } }
      filter: { eventDate: { lt: $dateNow }, passed: { equals: false } }
    ) {
      items {
        id
      }
    }
  }
`;

module.exports = async (event, ctx) => {
  // const response = await ctx.api.gqlRequest(
  //   PassedEventsUpdateByFilterMutation,
  //   {
  //     dateNow: new Date().toISOString(),
  //   },
  //   { checkPermissions: false }
  // );
  // if (response?.eventUpdateByFilter?.items && !response.error) {
  //   return {
  //     data: {
  //       success: true,
  //     },
  //   };
  // }
  // return {
  //   data: {
  //     success: false,
  //   },
  // };
};
