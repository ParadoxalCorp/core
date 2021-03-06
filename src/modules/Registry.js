
/**
 * Registry to store all instance metadata
 *
 * @class Registry
 */
class Registry {

    /**
     *Creates an instance of Registry.
     * @memberof Registry
     */
    constructor() {
        this._clusters = {};
        this._instances = {};
        this._workers = {};
        this._shards = {};
    }

    /**
     * Initiate the Registry module
     *
     * @returns {Promise<void>} Resolves once the Registry has been initiated
     * @memberof Registry
     */
    init() {
        return Promise.resolve();
    }

    /**
     * Register an instance
     *
     * @param {String} instanceID InstanceID of the instance being registered
     * @param {Object} config Instance configuration
     * @returns {Promise<void>} Resolves once the instance has been registered
     * @memberof Registry
     */
    registerInstance(instanceID, config) {
        this._instances[instanceID] = config;
        this._clusters[instanceID] = {};
        this._workers[instanceID] = {};
        this._shards[instanceID] = {};
        return Promise.resolve();
    }

    /**
     * Fetch an instance configuration
     *
     * @param {String} instanceID InstanceID of the instance fetching configuration for
     * @returns {Promise<Object>} Resolves with the instance configuration
     * @memberof Registry
     */
    getInstance(instanceID) {
        if (!this._instances[instanceID]) return Promise.reject(new Error(`No registered instance with ID ${instanceID}.`));
        return Promise.resolve(this._instances[instanceID]);
    }

    /**
     * Get all registered instances
     *
     * @returns {Promise<Object[]>} Resolves with the configuration of all registered instances
     * @memberof Registry
     */
    getInstances() {
        return Promise.resolve(Object.values(this._instances));
    }

    /**
     * Delete an instance from the registry
     *
     * @param {String} instanceID InstanceID of the instance to delete
     * @returns {Promise<void>} Resolves once the instance has been deleted from registry
     * @memberof Registry
     */
    deleteInstance(instanceID) {
        delete this._instances[instanceID];
        return Promise.resolve();
    }

    /**
     * Register a cluster configuration
     *
     * @param {String} instanceID InstanceID of the instance the cluster is part of
     * @param {Number} clusterID ClusterID to register the configuration as
     * @param {Object} config The cluster configuration
     * @returns {Promise<void>} Resolves once the cluster has been registered
     * @memberof Registry
     */
    registerCluster(instanceID, clusterID, config) {
        this._clusters[instanceID][clusterID] = config;
        return Promise.resolve();
    }

    /**
     * Fetch a cluster configuration
     *
     * @param {String} instanceID InstanceID of the instance the cluster is part of
     * @param {Number} clusterID ClusterID to fetch the configuration for
     * @returns {Promise<Object>} Resolves with the configuration of specified cluster
     * @memberof Registry
     */
    getCluster(instanceID, clusterID) {
        if (!this._clusters[instanceID][clusterID]) return Promise.reject(new Error(`No registered cluster with ID ${clusterID}.`));
        return Promise.resolve(this._clusters[instanceID][clusterID]);
    }

    /**
     * Fetch all cluster configurations for a specified instance
     *
     * @param {String} instanceID InstanceID of the instance the cluster is part of
     * @returns {Promise<Object[]>} Resolves with all cluster configurations
     * @memberof Registry
     */
    getClusters(instanceID) {
        return Promise.resolve(Object.values(this._clusters[instanceID]));
    }

    /**
     * Delete a cluster configuration
     *
     * @param {String} instanceID InstanceID of the instance the cluster is part of
     * @param {Number} clusterID ClusterID to delete
     * @returns {Promise<void>} Resolves once cluster has been deleted from registry
     * @memberof Registry
     */
    deleteCluster(instanceID, clusterID) {
        delete this._clusters[instanceID][clusterID];
        return Promise.resolve();
    }

    /**
     * Register a worker configuration
     *
     * @param {String} instanceID Instance the cluster is part of
     * @param {Number} workerID WorkerID to register the configuration as
     * @param {Number} clusterID ClusterID the worker serves
     * @returns {Promise<void>} Resolves once the configuration has been registered
     * @memberof Registry
     */
    registerWorker(instanceID, workerID, clusterID) {
        this._workers[instanceID][workerID] = clusterID;
        return Promise.resolve();
    }

    /**
     * Fetch a worker configuration
     *
     * @param {String} instanceID Instance the worker is part of
     * @param {Number} workerID WorkerID to fetch configuration for
     * @returns {Promise<Object>} Resolves with the worker configuration
     * @memberof Registry
     */
    getWorker(instanceID, workerID) {
        if (!this._workers[instanceID][workerID]) return Promise.reject(new Error(`No registered worker with ID ${workerID}.`));
        return Promise.resolve(this._workers[instanceID][workerID]);
    }

    /**
     * Fetch all worker configurations part of the specified instance
     *
     * @param {String} instanceID Instance the workers are part of
     * @returns {Promise<Object[]>} Resolves with all worker configurations
     * @memberof Registry
     */
    getWorkers(instanceID) {
        return Promise.resolve(Object.values(this._workers[instanceID]));
    }

    /**
     * Delete a worker configuration
     *
     * @param {String} instanceID Instance the worker is controlled by
     * @param {Number} workerID WorkerID of the worker
     * @returns {Promise<void>} Resolves once the worker configuration has been deleted
     * @memberof Registry
     */
    deleteWorker(instanceID, workerID) {
        delete this._workers[instanceID][workerID];
        return Promise.resolve();
    }

    /**
     * Register a ShardConfig
     *
     * @param {String} instanceID Instance the cluster is part of
     * @param {Number} clusterID ClusterID the ShardConfig is for
     * @param {Object} config Shard configuration
     * @returns {Promise<void>} Resolves once the ShardConfig has been registered
     * @memberof Registry
     */
    registerShardConfig(instanceID, clusterID, config) {
        this._shards[instanceID][clusterID] = config;
        return Promise.resolve();
    }

    /**
     * Fetch a ShardConfig
     *
     * @param {String} instanceID Instance the cluster is part of
     * @param {Number} clusterID ClusterID of the cluster fetching ShardConfig for
     * @returns {Promise<Object>} Resolves with the ShardConfig
     * @memberof Registry
     */
    getShardConfig(instanceID, clusterID) {
        if (!this._shards[instanceID][clusterID]) return Promise.reject(new Error(`No registered shardConfig for cluster ${clusterID}.`));
        return Promise.resolve(this._shards[instanceID][clusterID]);
    }

    /**
     * Delete a ShardConfig from registry
     *
     * @param {*} instanceID Instance the cluster is part of
     * @param {*} clusterID Cluster the ShardConfig is for
     * @returns {Promise<void>} Resolves once ShardConfig has been deleted
     * @memberof Registry
     */
    deleteShardConfig(instanceID, clusterID) {
        delete this._shards[instanceID][clusterID];
        return Promise.resolve();
    }
}

module.exports = Registry;