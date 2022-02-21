import React, { useEffect, useState, lazy, Suspense } from "react";
import { Route } from "react-router";
import { connect } from "react-redux";

import "./App.css";
import { firestore } from "./firebase/firebase.utils";
import {
  updateRequestsAction,
  updateCurrentUserAction,
} from "./redux/actions/appData.action";
import WithSpinner from "./components/with-spinner/with-spinner.component";

const SuggestionsPage = lazy(() =>
  import("./components/pages/suggestions-page/suggestions-page.component")
);
const NewFeedbackForm = lazy(() =>
  import("./components/pages/new-feedback/new-feedback.component")
);
const FeedbackDetailPage = lazy(() =>
  import("./components/pages/feed-back-detail-page/feedback-detail.component")
);
const FeedbackEditForm = lazy(() =>
  import("./components/pages/feedback-edit/edit-feedback.component")
);
const RoadmapPage = lazy(() =>
  import("./components/pages/roadmap-page/roadmap.component")
);

function App(props) {
  const [loading, isLoading] = useState(true);
  const { updateRequestsAction, updateCurrentUserAction } = props;

  useEffect(() => {
    const currentUserRef = firestore.collection("user");
    const collectionRef = firestore.collection("productRequests");

    currentUserRef.onSnapshot(async (snapshot) => {
      const currentUserMap = snapshot.docs.reduce((acc, obj) => {
        return (acc = { ...obj.data() });
      }, {});
      updateCurrentUserAction(currentUserMap);
    });

    collectionRef.onSnapshot(async (snapshot) => {
      const collectionMap = snapshot.docs.map((doc) => doc.data());
      updateRequestsAction(collectionMap);
      isLoading(false);
    });
  }, [updateCurrentUserAction, updateRequestsAction]);

  // useEffect(() => {
  //   const collectionRef = firestore.collection("productRequests");
  //   collectionRef.onSnapshot(async (snapshot) => {
  //     const collectionMap = snapshot.docs.map((doc) => doc.data());
  //     updateRequestsAction(collectionMap);
  //     isLoading(false);
  //   });
  // }, [updateRequestsAction]);

  return (
    <div className="App">
      <Suspense fallback={<WithSpinner />}>
        <Route
          exact
          path="/"
          render={(props) => <SuggestionsPage isLoading={loading} {...props} />}
        />
        <Route exact path="/new-feedback" component={NewFeedbackForm} />
        <Route
          exact
          path="/feedback/:requestID"
          render={(props) => (
            <FeedbackDetailPage isLoading={loading} {...props} />
          )}
        />
        <Route
          path="/feedback/:requestID/edit"
          render={(props) => (
            <FeedbackEditForm isLoading={loading} {...props} />
          )}
        />
        <Route
          path="/roadmap"
          render={(props) => <RoadmapPage isLoading={loading} {...props} />}
        />
      </Suspense>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateRequestsAction: (requests) => dispatch(updateRequestsAction(requests)),
  updateCurrentUserAction: (user) => dispatch(updateCurrentUserAction(user)),
});
export default connect(null, mapDispatchToProps)(App);
