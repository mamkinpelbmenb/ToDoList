// @ts-check

/**
 * @typedef {'high' | 'medium' | 'low'} Priority
 * @typedef {'none' | 'daily' | 'weekly' | 'monthly'} Recurrence
 * @typedef {'light' | 'dark' | 'blue' | 'green'} Theme
 */

/**
 * @typedef {Object} Subtask
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * @typedef {Object} Comment
 * @property {number} id
 * @property {string} text
 * @property {string} author
 * @property {Date} date
 */

/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} dueDate
 * @property {Priority} priority
 * @property {string} reminder
 * @property {Recurrence} recurrence
 * @property {boolean} completed
 * @property {Subtask[]} subtasks
 * @property {Comment[]} comments
 */

// Экспорт типов для использования в других файлах
export const types = {};